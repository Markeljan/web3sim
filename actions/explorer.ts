"use server";

import type { Abi } from "viem";

export type ContractSourceCodeResult = {
	ABI: string;
	ContractName: string;
	SourceCode: string;
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	[key: string]: any;
};

type FetchAbiResponse = {
	message: string;
	result: ContractSourceCodeResult;
	status: string;
};

export type ContractInfo = {
	contractName: string;
	abi: Abi[];
	sourceCode: string;
};

export async function getContractSourceCode({
	apiUrl,
	address,
}: {
	apiUrl: string;
	address: string;
}): Promise<ContractInfo> {
	const response = await fetch(
		`${apiUrl}?module=contract&action=getsourcecode&address=${address}`,
	);
	const data = (await response.json()) as FetchAbiResponse;

	if (data.status !== "1" || !data.result || data.result.length === 0) {
		throw new Error("Failed to fetch contract source code");
	}

	return parseContractInfo(data.result[0]);
}

// Function to parse the contract information
function parseContractInfo(result: ContractSourceCodeResult): ContractInfo {
	try {
		const contractName = result.ContractName;
		const abi = JSON.parse(result.ABI);
		const sourceCode = result.SourceCode;

		const contractInfo = {
			contractName,
			abi,
			sourceCode,
		};

		return contractInfo;
	} catch (error) {
		console.error("Error parsing contract information:", error);
		throw new Error("Failed to parse contract information");
	}
}
