export interface Token {
  name: string;
  ticker: string;
  address: string;
  image: string;
  decimal: string;
  featured: boolean;
  balance?: string;
}
export interface TradeInfo {
  amountIn: bigint;
  amountOut: bigint;
  path: readonly `0x${string}`[];
  pathTokens: Token[];
  adapters: readonly `0x${string}`[];
}

export interface ButtonState {
  enabled: boolean;
  text: string;
}

export type SwapStatus =
  | "LOADING"
  | "APPROVING"
  | "APPROVED"
  | "SWAPPING"
  | "SWAPPED"
  | "IDLE"
  | "FAILED";
