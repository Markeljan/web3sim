import { type Chain, defineChain } from "viem";

export const fhenixHelium: Chain = /*#__PURE__*/ defineChain({
	id: 8008135,
	name: "Fhenix Helium",
	nativeCurrency: { name: "Test FHE", symbol: "tFHE", decimals: 18 },
	rpcUrls: {
		default: {
			http: ["https://api.helium.fhenix.zone"],
			webSocket: ["wss://api.helium.fhenix.zone:8548"],
		},
	},
	blockExplorers: {
		default: {
			name: "Fhenix Helium Explorer",
			url: "https://explorer.helium.fhenix.zone",
		},
	},
	testnet: true,
});

