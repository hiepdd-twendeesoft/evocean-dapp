"use client";

import { MARKET_CONTRACT_ADDRESS } from "@/constants/contract";
import idl from "@/idl/marketplace.json";
import { Marketplace } from "@/idl/type";
import { ItemTheme } from "@/models/common.type";
import { detailTheme, listTheme } from "@/services/list-theme";
import { lamportsToSol } from "@/utils/lamports-to-sol";
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
import { useQuery } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import { Fragment, useState } from "react";
import { toast } from "react-toastify";

const DetailProduct = () => {
  const { back } = useRouter();
  const { id } = useParams();
  const { connection } = useConnection();
  const [priceOwner, setPriceOwner] = useState<string>("");
  const [priceSale, setPriceSale] = useState<string>("");

  const { data, refetch } = useQuery<ItemTheme, Error>({
    queryKey: ["detailTheme", { id }],
    queryFn: () => detailTheme(Number(id)),
    enabled: !!id,
  });

  const wallet = useAnchorWallet();

  const provider = new AnchorProvider(connection, wallet!, {});

  setProvider(provider);

  const program = new Program(
    idl as Marketplace,
    new PublicKey(MARKET_CONTRACT_ADDRESS)
  );

  const handleList = async () => {
    if (!priceOwner || !priceSale) {
      return toast.warn("Please cannot empty this field!");
    }
    if (!wallet) {
      return toast.warn("Not found wallet");
    }
    try {
      const tokenMint = new web3.PublicKey(
        data?.token_mint || "" //token_mint
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
        .list(new BN(Number(priceOwner) * web3.LAMPORTS_PER_SOL))
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
        listing_price: Number(priceOwner) * web3.LAMPORTS_PER_SOL,
        sale_price: Number(priceSale) * web3.LAMPORTS_PER_SOL,
        seller: wallet.publicKey.toBase58(),
        theme_id: Number(id),
      });
      refetch();
      toast.success("List theme successful!");
    } catch (error) {
      toast.error("List theme fail!");
      console.error("error list: ", error);
    }
  };

  const onChangePriceOwner = (event: any) => setPriceOwner(event.target.value);
  const onChangePriceSale = (event: any) => setPriceSale(event.target.value);

  return (
    <div className="min-h-[500px] mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-16">
      <button
        onClick={back}
        className="border-gray-300 border-[1px] flex items-center px-4 rounded-[12px] h-[40px] group hover:border-indigo-600"
      >
        <img
          src="/assets/icon/arrow-left.svg"
          alt="arrow"
          className="w-[16px]"
        />
        <p className="text-sm text-gray-700 font-medium ml-2 group-hover:text-indigo-600">
          Back to the list
        </p>
      </button>
      <h2 className="text-4xl font-semibold text-gray-900 mt-6">
        {data?.name}
      </h2>
      <div className="flex items-center mt-4">
        <p className="text-base font-normal text-gray-600">Date: 23 Mar 2024</p>
        <p className="text-base font-normal text-gray-600 ml-4">
          Order #4235123
        </p>
      </div>
      {!data?.sale && (
        <div className="border-gray-200 border-[1px] rounded-[12px] p-6 mt-6">
          <p className="text-base font-semibold text-gray-900 mb-2">
            Ownership price
          </p>
          <input
            placeholder="Ownership price..."
            className="w-full bg-indigo-50 h-[40px] rounded-[12px] px-3 outline-none mb-3 text-sm text-gray-700"
            type="number"
            value={priceOwner}
            onChange={onChangePriceOwner}
          />
          <p className="text-base font-semibold text-gray-900 mb-2 mt-2">
            Sale price
          </p>
          <input
            placeholder="Sale price..."
            className="w-full bg-indigo-50 h-[40px] rounded-[12px] px-3 outline-none mb-3 text-sm text-gray-700"
            type="number"
            onChange={onChangePriceSale}
            value={priceSale}
          />
          <div className="flex items-end justify-end mt-2">
            <button
              onClick={handleList}
              className="h-[40px] rounded-[12px] bg-indigo-600 px-6 flex items-center justify-center hover:bg-indigo "
            >
              <p className="text-white font-medium text-sm">Listing</p>
            </button>
          </div>
        </div>
      )}
      <div className="flex items-start justify-between max-md:flex-col mb-12 mt-12">
        <div className="w-[43%] max-md:w-[100%]">
          <h4 className="text-xl font-semibold text-gray-900 mb-3">
            Information
          </h4>
          <p className="text-base font-normal text-gray-800">
            {data?.overview}
          </p>
          <h4 className="text-xl font-semibold text-gray-900 mb-3 mt-8">
            Files
          </h4>

          <div className="flex items-center mb-6">
            <div className="h-[52px] rounded-[12px] bg-gray-100 px-4 flex items-center justify-center mr-4">
              <p className="text-lg font-semibold text-gray-500">.ZIP</p>
            </div>
            <div className="flex flex-1 flex-col">
              <h4 className="text-base font-medium text-gray-900 line-clamp-1">
                {data?.name}
              </h4>
              <p className="text-gray-600 text-base text-normal">File zip</p>
            </div>
            <a
              href={data?.zip_link}
              className="h-[42px] bg-indigo-600 rounded-[12px] flex items-center justify-center px-4 hover:-translate-y-1 duration-200 cursor-pointer"
            >
              <p className="text-base text-white font-semibold">Download</p>
            </a>
          </div>
        </div>
        <div className="w-[53%] max-md:mt-4 max-md:w-[100%]">
          <div className="border-gray-200 border-[1px] rounded-[12px] p-4 mb-4">
            <h4 className="text-xl font-semibold text-gray-900 mb-4">
              Order summary
            </h4>
            <div className="flex items-start mb-6">
              <img
                src={data?.media?.previews?.[0] || "/assets/image/theme.png"}
                alt="theme"
                className="w-[126px] h-[88px] rounded-[12px] mr-4"
              />
              <div>
                <h4 className="text-base font-semibold text-gray-900 mb-2">
                  {data?.name}
                </h4>
                <div className="flex items-center flex-wrap">
                  <div className="h-[28px] bg-indigo-100 rounded-[14px] px-3 flex items-center justify-center mr-2">
                    <p className="text-sm font-medium text-indigo-800">
                      UI Kit
                    </p>
                  </div>
                  <div className="h-[28px] bg-indigo-100 rounded-[14px] px-3 flex items-center justify-center">
                    <p className="text-sm font-medium text-indigo-800">
                      Framer template
                    </p>
                  </div>
                </div>
              </div>
            </div>
            {data?.listing && (
              <Fragment>
                <div className="flex items-center justify-between mb-3">
                  <p className="text-base font-normal text-gray-600">
                    Subtotal
                  </p>
                  <p className="text-base font-normal text-gray-600">
                    {lamportsToSol(data?.listing?.price)} SOL
                  </p>
                </div>
                {/* <div className="flex items-center justify-between mb-3">
                  <p className="text-base font-normal text-gray-600">
                    Gas fees
                  </p>
                  <p className="text-base font-normal text-gray-600">
                    0.0022 SOL
                  </p>
                </div> */}
                <div className="flex items-center justify-between mb-1">
                  <p className="text-base font-medium text-gray-900">
                    Total price
                  </p>
                  <p className="text-base font-medium text-gray-900">
                    {lamportsToSol(data?.listing?.price)} SOL
                  </p>
                </div>
              </Fragment>
            )}
          </div>
          <div className="border-gray-200 border-[1px] rounded-[12px] p-4 mb-4">
            <h4 className="text-xl font-semibold text-gray-900 mb-4">
              Transaction
            </h4>
            <div className="flex items-center justify-between mb-3">
              <p className="text-base font-normal text-gray-600">Signature</p>
              <p className="text-base font-normal text-gray-600">
                3boaqwaFiqymrXbcxG
              </p>
            </div>
            <div className="flex items-center justify-between mb-3">
              <p className="text-base font-normal text-gray-600">Time</p>
              <p className="text-base font-normal text-gray-600">14h ago</p>
            </div>
            <div className="flex items-center justify-between mb-3">
              <p className="text-base font-normal text-gray-600">Type</p>
              <p className="text-base font-normal text-gray-600">
                Spl-transfer
              </p>
            </div>
            <div className="flex items-center justify-between mb-3">
              <p className="text-base font-normal text-gray-600">From</p>
              <p className="text-base font-normal text-gray-600">
                2Awpt8...MHPjqN
              </p>
            </div>
            <div className="flex items-center justify-between mb-3">
              <p className="text-base font-normal text-gray-600">To</p>
              <p className="text-base font-normal text-gray-600">
                0xe3b29...1d73
              </p>
            </div>
            <div className="flex items-center justify-between mb-3">
              <p className="text-base font-normal text-gray-600">Account</p>
              <p className="text-base font-normal text-gray-600">
                Claynosaurz #9999
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailProduct;
