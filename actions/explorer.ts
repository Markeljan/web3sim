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
	chain: string;
	contractName: string;
	abi: Abi[];
	sourceCode: string;
};

export async function getContractSourceCode({
	apiUrl,
	address,
	apiKey,
}: {
	apiUrl: string;
	address: string;
	apiKey: string;
}): Promise<Omit<ContractInfo, "chain">> {
	let fetchUrl = `${apiUrl}?module=contract&action=getsourcecode&address=${address}`;
	if (apiKey) {
		fetchUrl += `&apikey=${apiKey}`;
	}
	const response = await fetch(fetchUrl);
	const data = (await response.json()) as FetchAbiResponse;

	if (data.status !== "1" || !data.result || data.result.length === 0) {
		throw new Error("Failed to fetch contract source code");
	}

	const parsedContractInfo = parseContractInfo(data.result[0]);

	return parsedContractInfo;
}

// Function to parse the contract information
const parseContractInfo = (
	result: ContractSourceCodeResult,
): Omit<ContractInfo, "chain"> => {
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
		return {
			contractName: result.ContractName,
			abi: result.ABI as unknown as Abi[],
			sourceCode: result.SourceCode,
		};
	}
};
