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
import { ToastContainer, Bounce } from "react-toastify";

const client = new QueryClient();
const Providers: FC<PropsWithChildren> = ({ children }) => {
  const wallet = new PhantomWalletAdapter();

  return (
    <QueryClientProvider client={client}>
      <ConnectionProvider endpoint={clusterApiUrl(WalletAdapterNetwork.Devnet)}>
        <WalletProvider wallets={[wallet]} autoConnect={true}>
          <ToastContainer
            position="top-right"
            autoClose={4500}
            hideProgressBar
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
            transition={Bounce}
          />
          {children}
        </WalletProvider>
      </ConnectionProvider>
    </QueryClientProvider>
  );
};

export default Providers;
