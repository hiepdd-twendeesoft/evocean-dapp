"use client";
import { MARKET_CONTRACT_ADDRESS } from "@/constants/contract";
import { useFetchTheme } from "@/hooks/useFetchTheme";
import idl from "@/idl/marketplace.json";
import { Marketplace } from "@/idl/type";

import { listTheme } from "@/services/list-theme";
import {
  AnchorProvider,
  BN,
  Program,
  setProvider,
  web3,
} from "@coral-xyz/anchor";
import {
  TOKEN_PROGRAM_ID,
  getAssociatedTokenAddressSync,
} from "@solana/spl-token";
import { useAnchorWallet, useConnection } from "@solana/wallet-adapter-react";
import { PublicKey } from "@solana/web3.js";
import { Fragment } from "react";
import ItemRowProduct from "../items/ItemRowProduct";

const TabOwner = () => {
  const { connection } = useConnection();

  const wallet = useAnchorWallet();

  const { data } = useFetchTheme(
    { page: 1, take: 1, author: wallet?.publicKey?.toBase58() },
    !wallet?.publicKey
  );

  const provider = new AnchorProvider(connection, wallet!, {});

  setProvider(provider);

  const program = new Program(
    idl as Marketplace,
    new PublicKey(MARKET_CONTRACT_ADDRESS)
  );

  const handleList = async () => {
    if (!wallet) {
      console.error("not found wallet");
      return;
    }
    try {
      const tokenMint = new web3.PublicKey(
        "E1c8YzKAoJsrevxUGEFgXCmECb5NJwjxB91vN8xz7VtK"
      );

      const [listingAccount] = web3.PublicKey.findProgramAddressSync(
        [Buffer.from("listing_account_"), tokenMint.toBuffer()],
        program.programId
      );

      const [marketTokenAccount] = web3.PublicKey.findProgramAddressSync(
        [Buffer.from("market_token_account_"), tokenMint.toBuffer()],
        program.programId
      );

      const tokenAccount = getAssociatedTokenAddressSync(
        tokenMint,
        wallet.publicKey
      );

      const instruction = await program.methods
        .list(new BN(2 * web3.LAMPORTS_PER_SOL))
        .accounts({
          listingAccount,
          marketTokenAccount,
          seller: wallet.publicKey,
          systemProgram: web3.SystemProgram.programId,
          tokenMint,
          tokenProgram: TOKEN_PROGRAM_ID,
          userTokenAccount: tokenAccount,
        })
        .instruction();

      const transaction = new web3.Transaction().add(instruction);

      await provider.sendAndConfirm(transaction);

      await listTheme({
        listing_price: 2 * web3.LAMPORTS_PER_SOL,
        sale_price: 1 * web3.LAMPORTS_PER_SOL,
        seller: wallet.publicKey.toBase58(),
        theme_id: 2,
      });

      console.log("done list");
    } catch (error) {
      console.error("error list: ", error);
    }
  };

  return (
    <div className="mb-8 mt-10">
      <button className="bg-red-600 p-4" onClick={handleList}>
        list
      </button>
      <h3 className="text-lg font-medium text-gray-900 mb-1">
        Your Owned products
      </h3>
      <p className="text-base text-gray-600 font-normal">
        View all successfully bid and owned products, along with your sales and
        earnings from these items.
      </p>
      <div className="w-full xl:mb-0 mt-12">
        <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 rounded">
          <div className="block w-full overflow-x-auto">
            <table className="items-center bg-transparent w-full">
              <thead>
                <tr className="border-b-[1px] border-b-gray-200">
                  <th className="pl-4 pr-14 text-gray-900 text-sm font-semibold align-middle py-3 whitespace-nowrap text-left">
                    Product
                  </th>
                  <th className="px-4 text-gray-900 text-sm font-semibold align-middle py-3 whitespace-nowrap text-left">
                    Author
                  </th>
                  <th className="px-4 text-gray-900 text-sm font-semibold align-middle py-3 whitespace-nowrap text-left">
                    Price
                  </th>
                  <th className="px-4 text-gray-900 text-sm font-semibold align-middle py-3 whitespace-nowrap text-left">
                    Sales
                  </th>
                  <th className="px-4 text-gray-900 text-sm font-semibold align-middle py-3 whitespace-nowrap text-left">
                    Earning
                  </th>
                </tr>
              </thead>
              <tbody>
                {data?.pages?.map((page, indexPage) => (
                  <Fragment key={indexPage}>
                    {page.data?.map((item, index) => (
                      <ItemRowProduct
                        key={index}
                        name={item.name}
                        image={item.media?.previews?.[0]}
                        author_address={item.author_address}
                      />
                    ))}
                  </Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TabOwner;
