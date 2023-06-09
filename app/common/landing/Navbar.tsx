import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="fixed z-20 flex flex-row items-center justify-between w-full px-8 py-6 lg:px-24">
      <div className="flex flex-row items-center justify-between w-full">
        <Link href={"/"}>
          <Image
            src={"/logo/logo-white.svg"}
            alt="Just a DEX Logo"
            height={50}
            width={200}
            priority
          />
        </Link>
        <ul className="flex flex-row items-center justify-center gap-12">
          <li>
            <Link
              href={"/app/swap"}
              className="px-6 py-2.5 text-white rounded-md shadow-sm cursor-pointer bg-accent font-semibold"
            >
              Launch App
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
