import { http, createConfig } from "wagmi";
import { mode } from "wagmi/chains";

export const config = createConfig({
  chains: [mode],
  transports: {
    [mode.id]: http(),
  },
});
