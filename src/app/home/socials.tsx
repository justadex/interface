import SocialsData from "./data/socials.json";
import Image from "next/image";

export default function Socails() {
  return (
    <section className="py-36" id="socials">
      <div className="flex flex-col gap-12 border-2 border-secondary rounded justify-start py-12 items-center w-full px-8 noise">
        <h3 className=" text-center shadow-md text-2xl font-medium border-b-2 border-accent">
          Join the community
        </h3>
        <div className="flex flex-row gap-16 items-center justify-center">
          {SocialsData.map((social, s) => {
            return (
              <div key={s}>
                <Image
                  src={social.icon}
                  alt={social.name}
                  height={"50"}
                  width={"50"}
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
