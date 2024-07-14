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

	if (!apiUrl || !viemChain) {
		throw new Error(`Failed to find chain or apiUrl for ${chain}`);
	}

	const flattenedPrompt = prompt?.join(" ");

	const { contractName, abi, sourceCode } = await getContractSourceCode({
		apiUrl,
		address,
	});

	const sanitizedPrompt = flattenedPrompt
		? decodeURIComponent(flattenedPrompt)
		: "Dapp for interacting with the smart contract";

	return (
		<StreamUI
			prompt={sanitizedPrompt}
			contractData={{
				chain: viemChain.name,
				contractName,
				abi,
				sourceCode,
			}}
		/>
	);
}
