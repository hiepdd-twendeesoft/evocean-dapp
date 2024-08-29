import React from 'react';
import {
  createInitializeMint2Instruction,
  getAssociatedTokenAddressSync,
  getMinimumBalanceForRentExemptMint,
  MINT_SIZE,
  TOKEN_PROGRAM_ID,
  getAccount,
  TokenAccountNotFoundError,
  TokenInvalidAccountOwnerError,
  createAssociatedTokenAccountInstruction,
  createMintToInstruction,
  createSetAuthorityInstruction,
  AuthorityType,
  mintTo
} from '@solana/spl-token';
import { useWallet } from '@solana/wallet-adapter-react';
import { useTx } from './useTx';
import { BN, web3 } from '@coral-xyz/anchor';

function useMintAndListingNFT() {
  const { connected, publicKey } = useWallet();
  const { provider, program } = useTx();

  let associatedToken: web3.PublicKey;

  const mintAndListingNFT = async () => {
    const tx = new web3.Transaction();

    const lamports = await getMinimumBalanceForRentExemptMint(
      provider.connection
    );

    const mint = web3.Keypair.generate();

    if (publicKey && connected) {
      tx.add(
        web3.SystemProgram.createAccount({
          fromPubkey: publicKey,
          newAccountPubkey: mint.publicKey,
          space: MINT_SIZE,
          lamports,
          programId: TOKEN_PROGRAM_ID
        }),
        createInitializeMint2Instruction(
          mint.publicKey,
          0,
          publicKey,
          publicKey,
          TOKEN_PROGRAM_ID
        )
      );

      associatedToken = getAssociatedTokenAddressSync(
        mint.publicKey,
        publicKey
      );

      try {
        await getAccount(provider.connection, associatedToken);
      } catch (error: unknown) {
        if (
          error instanceof TokenAccountNotFoundError ||
          error instanceof TokenInvalidAccountOwnerError
        ) {
          tx.add(
            createAssociatedTokenAccountInstruction(
              publicKey,
              associatedToken,
              publicKey,
              mint.publicKey
            )
          );
        } else {
          throw error;
        }
      }

      tx.add(
        createMintToInstruction(mint.publicKey, associatedToken, publicKey, 1),
        createSetAuthorityInstruction(
          mint.publicKey,
          publicKey,
          AuthorityType.MintTokens,
          null
        )
      );

      const [listingAccount] = web3.PublicKey.findProgramAddressSync(
        [Buffer.from('listing_account_'), mint.publicKey.toBuffer()],
        program.programId
      );

      const [marketTokenAccount] = web3.PublicKey.findProgramAddressSync(
        [Buffer.from('market_token_account_'), mint.publicKey.toBuffer()],
        program.programId
      );

      tx.add(
        await program.methods
          .list(new BN(10 * web3.LAMPORTS_PER_SOL))
          .accountsStrict({
            listingAccount,
            marketTokenAccount,
            tokenMint: mint.publicKey,
            userTokenAccount: associatedToken,
            seller: publicKey!,
            systemProgram: web3.SystemProgram.programId,
            tokenProgram: TOKEN_PROGRAM_ID
          })
          .instruction()
      );
    }
    await provider.sendAndConfirm(tx, [mint]);
    return mint;
  };

  return {
    mintAndListingNFT
  };
}

export default useMintAndListingNFT;
