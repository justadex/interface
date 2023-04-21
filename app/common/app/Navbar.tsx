"use client";
import { useAccount, useConnect, useEnsName, useDisconnect } from "wagmi";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ConnectButton } from "@rainbow-me/rainbowkit";

const Navbar = () => {
  const pathname = usePathname();
  const { address, isConnected } = useAccount();

  return (
    <nav className="fixed z-20 flex flex-row items-center justify-between w-full px-8 py-6 lg:px-24 text-offwhite">
      <div className="grid w-full grid-cols-3 gap-4">
        <Link href={"/"}>
          <Image
            src={"/logo/icon-white.svg"}
            alt="Just a DEX Logo"
            height={50}
            width={50}
            priority
          />
        </Link>
        <ul className="flex flex-row items-center justify-center gap-12">
          <li>
            <Link
              className={
                pathname === "/app/swap" ? "font-semibold text-white" : ""
              }
              href={"/app/swap"}
            >
              Swap
            </Link>
          </li>
          <li>
            <Link
              className={
                pathname === "/app/pool" ? "font-semibold text-white" : ""
              }
              href={"/app/pool"}
            >
              Pool
            </Link>
          </li>
          <li>Portfolio</li>
        </ul>
        <div className="flex justify-end">
          <ConnectButton showBalance={false} />
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
