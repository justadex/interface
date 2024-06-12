import { Address, erc20Abi } from "viem";
import { Token } from "../app/types/interface";
import Adapters from "@/app/app/data/adapters.json";
import Tokens from "@/app/app/data/tokens.json";

export function convertToBigInt(amount: number, decimals: number) {
  const parsedAmountIn = BigInt(Math.floor(amount * Math.pow(10, 6)));
  if (decimals >= 6) return parsedAmountIn * BigInt(10) ** BigInt(decimals - 6);
  else return parsedAmountIn / BigInt(10) ** BigInt(6 - decimals);
}

export function buildBalanceCheckParams(_tokens: Token[], address: Address) {
  let readContractArray = [];
  for (let i = 0; i < _tokens.length; i++) {
    if (_tokens[i].address) {
      readContractArray.push({
        address: _tokens[i].address as `0x{string}`,
        abi: erc20Abi,
        functionName: "balanceOf",
        args: [address!],
      });
    }
  }
  return readContractArray;
}

export function formatFloat(value: number) {
  if (!value) {
    return value;
  }
  if (typeof value !== "number") {
    return value;
  }

  const valueString = value.toString();
  const decimalIndex = valueString.indexOf(".");

  if (decimalIndex === -1) {
    return value;
  }

  const decimalPart = valueString.slice(decimalIndex + 1);
  if (decimalPart.length > 6) {
    return parseFloat(value.toFixed(6));
  }

  return value;
}

export function getTokenInfoByAddress(
  address: string
): { name: string; decimal: string; icon: string } | undefined {
  console.log(address);
  if (!address) {
    return undefined;
  }
  const token = Tokens.find(
    (token) => token.address.toLowerCase() === address.toLowerCase()
  );
  if (token) {
    return {
      name: token.name,
      decimal: token.decimal,
      icon: token.image,
    };
  } else {
    return undefined;
  }
}

export function getTokenInfoByAdapters(
  address: string
): { name: string; icon: string } | undefined {
  console.log(address);
  if (!address) {
    return undefined;
  }
  const token = Adapters.find(
    (token) => token.address.toLowerCase() === address.toLowerCase()
  );
  if (token) {
    return {
      name: token.name,
      icon: token.icon,
    };
  } else {
    return undefined;
  }
}