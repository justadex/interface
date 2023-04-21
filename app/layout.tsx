import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });
import RainbowKit from "./common/rainbow-kit";
export const metadata = {
  title: "Just a DEX",
  description: "Just a DEX a basic swap with superpowers on Shardeum Chain",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html className={inter.className} lang="en">
      <body>
        <RainbowKit>{children}</RainbowKit>
        <Analytics />
      </body>
    </html>
  );
}
