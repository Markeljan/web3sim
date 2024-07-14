"use client";

import { type Abi, parseAbi } from "viem";
import { base } from "viem/chains";
import { useAccount, useWriteContract } from "wagmi";

// TEMP: elevate to context or hook
const contractConfig = {
	chain: base,
	address: "0x4610bb911468c2ca2fe5ffd01eafbf6de9a78ba1" as `0x${string}`, // Gloomers NFT
	abi: parseAbi([
		"function balanceOf(address owner) view returns (uint256)",
		"event Transfer(address indexed from, address indexed to, uint256 amount)",
	]),
};
export const SmartContractUI = ({ html }: { html: string }) => {
	const { address, isConnected } = useAccount();
	const { data, error, writeContract } = useWriteContract();

	const writeFunction = async (functionName: string, args: unknown[]) => {
		const result = writeContract({
			chain: contractConfig.chain,
			address: contractConfig.address,
			abi: contractConfig.abi,
			functionName,
			args,
		});
	};

	// biome-ignore lint/security/noDangerouslySetInnerHtml: yolo
	return <div dangerouslySetInnerHTML={{ __html: html }} />;
};
