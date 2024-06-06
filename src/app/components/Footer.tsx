import Image from "next/image";
import Link from "next/link";
import SocialsData from "@/app/home/data/socials.json";
export default function Footer() {
  return (
    <>
      <footer className="py-8 px-8 xl:px-24 w-full text-center bg-secondary flex flex-col md:grid grid-cols-2 items-center justify-center gap-y-12 md:gap-y-10">
        <Image
          src="/logo/logo-white.svg"
          alt="JustaDEX"
          width={232}
          height={50}
        />

        <div className="flex flex-row justify-center md:justify-end items-center gap-12">
          {SocialsData.map((social, s) => {
            return (
              <Link target="_blank" href={social.link} key={s}>
                <Image
                  className=""
                  src={social.icon}
                  alt={social.name}
                  height={"35"}
                  width={"35"}
                />
              </Link>
            );
          })}
        </div>
        <ul className="flex flex-col md:flex-row items-center justify-center md:justify-start text-center md:text-left gap-6 md:gap-12 font-medium">
          <li>
            <Link href="https://docs.justadex.xyz/" target="_blank">
              Docs
            </Link>
          </li>
          <li>
            <Link
              href="https://docs.justadex.xyz/terms-and-conditions"
              target="_blank"
            >
              Terms & Conditions
            </Link>
          </li>
          <li>
            <Link
              href="https://docs.justadex.xyz/privacy-policy"
              target="_blank"
            >
              Privacy Policy
            </Link>
          </li>
        </ul>
        <div className="flex flex-col justify-end items-end gap-6 text-sm">
          <p>All Rights Reserved. © Copyright 2024. JustaDEX</p>
        </div>
      </footer>
    </>
  );
}
