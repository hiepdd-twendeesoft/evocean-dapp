import { Marketplace } from '@/idl/type';
import { AnchorProvider, Program, setProvider } from '@coral-xyz/anchor';
import { useAnchorWallet, useConnection } from '@solana/wallet-adapter-react';
import idl from '@/idl/marketplace.json';
import { PublicKey } from '@solana/web3.js';
import { MARKET_CONTRACT_ADDRESS } from '@/constants/contract';

export const useTx = () => {
  const { connection } = useConnection();
  const wallet = useAnchorWallet();

  const provider = new AnchorProvider(connection, wallet!, {});

  setProvider(provider);

  const program = new Program(
    idl as Marketplace,
    new PublicKey(MARKET_CONTRACT_ADDRESS)
  );

  return { program, provider };
};
