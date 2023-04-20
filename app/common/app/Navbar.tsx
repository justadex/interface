"use client";
import { useAccount, useConnect, useEnsName, useDisconnect } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();
  const { address, isConnected } = useAccount();
  const { data: ensName } = useEnsName({ address });
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  });
  const { disconnect } = useDisconnect();

  return (
    <nav className="fixed z-20 flex flex-row items-center justify-between w-full px-8 py-6 lg:px-24">
      <div className="flex flex-row items-center justify-between w-full">
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
          {isConnected ? (
            <>
              <li>
                <Link
                  className={pathname === "/app/swap" ? "font-bold" : ""}
                  href={"/app/swap"}
                >
                  Swap
                </Link>
              </li>
              <li>
                <Link
                  className={pathname === "/app/pool" ? "font-bold" : ""}
                  href={"/app/pool"}
                >
                  Pool
                </Link>
              </li>
              <li>Portfolio</li>
              <li>
                <div className="flex flex-row items-center justify-center gap-1 px-4 py-2 rounded-md shadow-sm cursor-pointer bg-slate-200 text-slate-600 hover:text-slate-200 hover:bg-slate-600">
                  <p className="w-24 overflow-hidden truncate">
                    {ensName ?? address}
                  </p>
                  <button className="" onClick={() => disconnect()}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </button>
                </div>
              </li>
            </>
          ) : (
            <li>
              <a
                className="px-4 py-2 rounded-md shadow-sm cursor-pointer bg-slate-200 text-slate-600 hover:text-slate-200 hover:bg-slate-600"
                onClick={() => connect()}
              >
                Connect Wallet
              </a>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
}
