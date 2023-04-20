import "./globals.css";
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });
import Connect from "./components/Connect/wallet-connect";
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
        <Connect>{children}</Connect>
      </body>
    </html>
  );
}
