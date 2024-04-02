"use client";

import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { PhantomWalletAdapter } from "@solana/wallet-adapter-phantom";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { clusterApiUrl } from "@solana/web3.js";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { FC, PropsWithChildren } from "react";

const client = new QueryClient();
const Providers: FC<PropsWithChildren> = ({ children }) => {
  const wallet = new PhantomWalletAdapter();

  console.log("wallet>", wallet);

  return (
    <QueryClientProvider client={client}>
      <ConnectionProvider endpoint={clusterApiUrl(WalletAdapterNetwork.Devnet)}>
        <WalletProvider wallets={[wallet]} autoConnect={true}>
          {children}
        </WalletProvider>
      </ConnectionProvider>
    </QueryClientProvider>
  );
};

export default Providers;
