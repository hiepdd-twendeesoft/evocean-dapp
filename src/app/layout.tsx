import Providers from "@/utils/provider";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Head from "next/head";
import { GoogleOAuthProvider } from "@react-oauth/google";

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
        <GoogleOAuthProvider
          clientId={
            "809077903320-uihs9ruoocvtkv3l3pmsj1387jr5feik.apps.googleusercontent.com"
          }
        >
          <Providers>{children}</Providers>
        </GoogleOAuthProvider>
      </body>
    </html>
  );
}
