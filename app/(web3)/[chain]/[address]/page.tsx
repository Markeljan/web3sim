import { getContractSourceCode } from "@/actions/explorer";
import { ipfsFetch } from "@/actions/lighthouse";
import { StreamUI } from "@/components/stream-ui";
import { APP_URL, getExplorerApiKey } from "@/lib/config";
import { fuzzyMatchChain } from "@/lib/fuse";

export default async function Page({
	params,
}: {
	params: {
		chain: string;
		address: string;
	};
}) {
	const { chain, address } = params;

	if (chain === "share") {
		const cid = params.address;

		const htmlText = await ipfsFetch(cid);

		const prompt =
			"DO NOT GENERATE ANYTHING NEW!  USE THE HTML TEXT PROVIDED TO RENDER THE SHARED WEBPAGE.";
		return (
			<StreamUI
				prompt={prompt}
				data={{
					html: htmlText,
				}}
			/>
		);
	}

	const viemChain = fuzzyMatchChain(chain);

	const defaultExplorer =
		viemChain?.blockExplorers?.default || viemChain?.blockExplorers?.[0];

	const apiUrl = defaultExplorer
		? defaultExplorer?.apiUrl || `${defaultExplorer?.url}/api`
		: undefined;

	if (!apiUrl || !viemChain) {
		throw new Error(`Failed to find chain or apiUrl for ${chain}`);
	}

	const apiKey = getExplorerApiKey(viemChain.id);

	const { contractName, abi, sourceCode } = await getContractSourceCode({
		address,
		apiUrl,
		apiKey,
	});

	const prompt = `Instead of generating smart contract UIs, generate a UI to display this list of dapps genereated by users.  They should all have anchor tags that link to ${APP_URL}/share/[cid] Map over the uploadsResponse.fileList and display them in a nice way.`;

	return (
		<StreamUI
			prompt={prompt}
			data={{
				chain: viemChain.name,
				contractName,
				abi,
				sourceCode,
			}}
		/>
	);
}
