"use client";
import { useState } from "react";
import DexsData from "./data/supported-dex.json";
import Link from "next/link";
import Image from "next/image";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Link2Icon } from "lucide-react";

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
  adapters: Adapters[];
}
interface Adapters {
  name: string;
  address: string;
}

export default function Dexs() {
  const [selectedDex, setSelectedDex] = useState(0);
  return (
    <section className="py-24" id="integrations">
      <div className="grid grid-cols-1 gap-8">
        <div className="flex flex-row justify-between items-center">
          <h3 className=" text-center shadow-md text-2xl font-medium border-b-2 border-accent">
            Chains & DEXs
          </h3>
          <Select
            defaultValue={selectedDex.toString()}
            onValueChange={(e) => setSelectedDex(parseInt(e))}
          >
            <SelectTrigger className="w-[180px] bg-primary border-secondary">
              <div className="flex flex-row justify-start items-center gap-2">
                <Image
                  src={DexsData[selectedDex].logo || ""}
                  alt={DexsData[selectedDex].name}
                  width={"20"}
                  height={"20"}
                />
                <div>{DexsData[selectedDex].name}</div>
              </div>
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
        <div className="grid grid-cols-2 gap-6">
          {DexsData[selectedDex].dexs.map((dex: DEXS, d) => {
            return (
              <div
                className="flex-col gap-4 border-2 border-secondary rounded flex justify-center py-6 items-center w-full blob"
                key={d}
              >
                <Image
                  className="aspect-video object-contain"
                  src={dex.logo}
                  width="150"
                  height="50"
                  alt={dex.name}
                />
                <h3 className="font-semibold">{dex.name}</h3>
                <div className="text-sm flex flex-row justify-center items-center gap-4">
                  {dex.adapters.map((adapter, a) => {
                    return (
                      <div className="bg-primary px-2 py-1 rounded" key={a}>
                        {adapter.name}
                      </div>
                    );
                  })}
                </div>
                <Link
                  className="flex flex-row justify-center items-center gap-2 text-sm"
                  href={dex.link}
                  target="_blank"
                >
                  <Link2Icon className="h-4 w-4" />
                  Website
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
