import type { Metadata } from "next";
import { Mulish } from "next/font/google";
import "./globals.css";

const mulish = Mulish({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "JustaDEX - Your Ultimate DEX Aggregator on Mode Blockchain",
  description:
    "Explore the best decentralized exchanges (DEXs) on the Mode blockchain with JustaDex. Enjoy seamless trading with the best rates and liquidity, all in one place. Start trading your favorite tokens today!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className="" lang="en">
      <body className={mulish.className}>{children}</body>
    </html>
  );
}
