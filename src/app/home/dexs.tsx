"use client";
import { useState } from "react";
import DexsData from "./supported-dex.json";
import Link from "next/link";
import Image from "next/image";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface SelectedDEX {
  name: string;
  logo: string;
  chainID: number;
  dexs: DEXS[];
}

interface DEXS {
  name: string;
  logo: string;
  link: string;
}
export default function Dexs() {
  const [selectedDex, setSelectedDex] = useState(0);
  return (
    <>
      <section className="py-6">
        <div className="grid grid-cols-1 gap-8">
          <div className="flex flex-row justify-between items-center">
            <h3 className=" text-center rounded-xl shadow-md text-2xl font-medium">
              Supported DEXs
            </h3>
            <Select onValueChange={(e) => setSelectedDex(parseInt(e))}>
              <SelectTrigger className="w-[180px] bg-primary border-secondary">
                <SelectValue placeholder={DexsData[selectedDex].name} />
              </SelectTrigger>
              <SelectContent className=" bg-secondary text-offwhite">
                {DexsData.map((chain, c) => {
                  return (
                    <SelectItem value={c.toString()} key={c}>
                      <div className="flex flex-row justify-start items-center gap-2">
                        <Image
                          src={chain.logo || ""}
                          alt={chain.name}
                          width={"20"}
                          height={"20"}
                        />

                        <div>{chain.name}</div>
                      </div>
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 gap-6">
            {DexsData[selectedDex].dexs.map((dex: DEXS, d) => {
              return (
                <Link
                  href={dex.link}
                  target="_blank"
                  className=" border-2 border-secondary rounded flex justify-center py-4 items-center w-full"
                  key={d}
                >
                  <Image
                    className="aspect-video object-contain"
                    src={dex.logo}
                    width="150"
                    height="50"
                    alt={dex.name}
                  />
                  {/* <div>{dex.name}</div> */}
                </Link>
              );
            })}
          </div>
        </div>
      </section>
      <section
        className="py-6 flex flex-col justify-center items-center gap-8 w-full"
        id="integrations"
      >
        <div className="flex flex-col gap-2 justify-center items-center">
          <h2 className="text-center rounded-xl shadow-md text-4xl font-medium">
            Integrations
          </h2>
          {/* <h3>Chains/DEXs</h3> */}
        </div>
        <div className="grid grid-cols-3 gap-6 w-full border-2 border-secondary rounded-lg p-6 rounded-sm">
          <div className="flex flex-col justify-center items-center w-full">
            {DexsData.map((chain, c) => {
              return (
                <div
                  className={`flex flex-row gap-4 cursor-pointer justify-center px-8 py-4 w-full items-center ${
                    selectedDex === c
                      ? " bg-secondary border-2 border-accent rounded"
                      : "border-2 border-transparent"
                  }`}
                  onClick={() => setSelectedDex(c)}
                  key={c}
                >
                  <Image
                    className=" rounded-full"
                    src={chain.logo}
                    width={"30"}
                    height={"30"}
                    alt={chain.name}
                  />
                  <h3>{chain.name}</h3>
                </div>
              );
            })}
          </div>
          <div className="grid grid-cols-2 w-full gap-6 col-span-2">
            {DexsData[selectedDex].dexs.map((dex: DEXS, d) => {
              return (
                <Link
                  href={dex.link}
                  target="_blank"
                  className=" border-2 border-secondary rounded-xl flex justify-center py-4 items-center w-full"
                  key={d}
                >
                  <Image
                    className="aspect-video object-contain"
                    src={dex.logo}
                    width="150"
                    height="50"
                    alt={dex.name}
                  />
                  {/* <div>{dex.name}</div> */}
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
