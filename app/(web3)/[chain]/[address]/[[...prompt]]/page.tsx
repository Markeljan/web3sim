import { getContractSourceCode } from "@/actions/explorer";
import { StreamUI } from "@/components/stream-ui";
import { fuzzyMatchChain } from "@/lib/fuse";

export default async function Page({
	params,
}: {
	params: {
		chain: string;
		address: string;
		prompt?: string[];
	};
}) {
	const { chain, address, prompt } = params;

	const viemChain = fuzzyMatchChain(chain);

	const defaultExplorer =
		viemChain?.blockExplorers?.default || viemChain?.blockExplorers?.[0];

	const apiUrl = defaultExplorer
		? defaultExplorer?.apiUrl || `${defaultExplorer?.url}/api`
		: undefined;
	console.log("Chain:", chain);
	console.log("Chain Match:", viemChain?.name);
	console.log("explorerApiUrl:", apiUrl);

	if (!apiUrl) {
		throw new Error("Failed to find explorerApiUrl for chain");
	}

	const flattenedPrompt = prompt?.join(" ");

	const { contractName, abi, sourceCode } = await getContractSourceCode({
		apiUrl,
		address,
	});
	console.log("Contract Name:", contractName);
	console.log("ABI:", abi.length);
	console.log("Source Code:", sourceCode.length);

	const sanitizedPrompt = flattenedPrompt
		? decodeURIComponent(flattenedPrompt)
		: "Dapp for interacting with the smart contract";

	return (
		<StreamUI
			prompt={sanitizedPrompt}
			contractData={{
				contractName,
				abi,
				sourceCode,
			}}
		/>
	);
}
