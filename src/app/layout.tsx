import type { Metadata } from "next";
import { Mulish } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";

const mulish = Mulish({
  subsets: ["latin"],
});

export const metadata = {
  title: "JustaDEX - Your Ultimate DEX Aggregator on Mode Blockchain",
  description:
    "Explore the best DEXs on the Mode blockchain with JustaDex. Seamless trading with top rates and liquidity, all in one place. Start trading your favorite tokens today!",
  openGraph: {
    title: "JustaDEX - Your Ultimate DEX Aggregator on Mode Blockchain",
    url: process.env.URL,
    description:
      "Explore the best DEXs on the Mode blockchain with JustaDex. Seamless trading with top rates and liquidity, all in one place. Start trading your favorite tokens today!",
    images: [
      {
        url: "https://www.justadex.xyz/og/og-home.png",
        secureUrl: "https://www.justadex.xyz/og/og-home.png",
        alt: "JustaDEX - Your Ultimate DEX Aggregator on Mode Blockchain",
        width: 1200,
        height: 630,
        type: "image/png",
      },
    ],
    locale: "en-US",
    type: "website",
  },
  alternates: {
    canonical: process.env.URL,
  },
  twitter: {
    card: "summary_large_image",
    title: "JustaDEX - Your Ultimate DEX Aggregator on Mode Blockchain",
    description:
      "Explore the best DEXs on the Mode blockchain with JustaDex. Seamless trading with top rates and liquidity, all in one place. Start trading your favorite tokens today!",
    creator: "@justadex_defi",
    images: ["https://www.justadex.xyz/og/og-home.png"],
  },
  robots: {
    index: true,
  },
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
