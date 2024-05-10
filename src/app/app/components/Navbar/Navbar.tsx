"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import AppLinks from "./data/Links.json";
import WalletOptions from "../WalletConnect/WalletConnect";

const Navbar = () => {
  const pathname = usePathname();

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
          {/* {AppLinks.map((link, i) => {
            return (
              <li
                className="flex flex-col items-center justify-center gap-1"
                key={i}
              >
                <Link
                  className={
                    pathname === link.link ? "font-semibold text-white" : ""
                  }
                  href={link.link}
                >
                  {link.name}
                </Link>
                {pathname === link.link ? (
                  <div className="w-2 h-1 text-center bg-white rounded-full"></div>
                ) : (
                  <div className="w-2 h-1 text-center rounded-full bg-trasparent"></div>
                )}
              </li>
            );
          })} */}
        </ul>
        <div className="flex justify-end">
          {/* <ConnectButton showBalance={false} /> */}
          <WalletOptions />
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
