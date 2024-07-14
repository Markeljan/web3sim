import { type Chain, base } from "viem/chains";
import { http, createConfig } from "wagmi";

declare module "wagmi" {
	interface Register {
		config: typeof config;
	}
}

const DEFAULT_WAGMI_CONFIG = {
	chains: [base],
	multiInjectedProviderDiscovery: false,
	ssr: true,
	transports: {
		[base.id]: http(),
	},
} as const;

export const config = createConfig(DEFAULT_WAGMI_CONFIG);

export const createDynamicConfig = (chain: Chain) => {
	return createConfig({
		...DEFAULT_WAGMI_CONFIG,
		chains: [chain],
		transports: {
			[chain.id]: http(),
		},
	});
};
