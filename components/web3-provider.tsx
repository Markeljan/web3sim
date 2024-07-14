"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider } from "wagmi";

import { DYNAMIC_ENVIRONMENT_ID } from "@/lib/config";
import {
	DynamicContextProvider,
	DynamicWagmiConnector,
	EthereumWalletConnectors,
} from "@/lib/dynamic";
import { config } from "@/lib/wagmi-config";

const queryClient = new QueryClient();

export default function Web3Provider({
	children,
}: { children: React.ReactNode }) {
	return (
		<DynamicContextProvider
			settings={{
				recommendedWallets: [{ walletKey: "coinbase" }],
				environmentId: DYNAMIC_ENVIRONMENT_ID,
				walletConnectors: [EthereumWalletConnectors],
			}}
		>
			<WagmiProvider config={config}>
				<QueryClientProvider client={queryClient}>
					<DynamicWagmiConnector>{children}</DynamicWagmiConnector>
				</QueryClientProvider>
			</WagmiProvider>
		</DynamicContextProvider>
	);
}
