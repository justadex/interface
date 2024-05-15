import Link from "next/link";
import Image from "next/image";
import Navbar from "./components/Navbar/Navbar";
import Dexs from "./home/dexs";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <div className="px-8 md:px-24">
        <section className="min-h-screen home flex flex-col justify-center text-center gap-6 items-center">
          <h1 className="text-5xl font-bold max-w-4xl leading-snug">
            Your Ultimate DEX Aggregator on Mode Blockchain
          </h1>
          <p className="text-xl max-w-2xl font-light">
            Enjoy seamless trading with the best rates and liquidity, all in one
            place. Start trading your favorite tokens today!
          </p>
          <Link
            href={"/app"}
            className="px-6 py-2.5 text-white rounded-md shadow-sm cursor-pointer bg-accent font-semibold mt-4 text-xl"
          >
            Launch App
          </Link>
        </section>
        <Dexs />
        <Footer />
      </div>
    </>
  );
}
