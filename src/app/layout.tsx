import Providers from "@/utils/provider";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Head from "next/head";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MoonKit",
  description: "NFT Digital Assets Marketplace",
  icons: [
    {
      url: "/icon.ico",
      href: "/icon.ico",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full bg-white">
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
