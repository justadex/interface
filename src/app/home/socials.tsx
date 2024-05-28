import SocialsData from "./data/socials.json";
import Image from "next/image";
import Link from "next/link";

export default function Socails() {
  return (
    <section className="py-12 xl:py-36" id="socials">
      <div className="flex flex-col gap-12 border border-offwhite/10 rounded justify-start py-12 xl:py-24 items-center w-full px-8">
        <h3 className=" text-center shadow-md text-2xl xl:text-3xl font-medium border-b-2 border-accent">
          Join the community
        </h3>
        <div className="grid grid-cols-2 xl:flex flex-row gap-16 items-center justify-center">
          {SocialsData.map((social, s) => {
            return (
              <Link target="_blank" href={social.link} key={s}>
                <Image
                  src={social.icon}
                  alt={social.name}
                  height={"50"}
                  width={"50"}
                />
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
