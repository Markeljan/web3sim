import Fuse, { type IFuseOptions } from "fuse.js";
import type { Chain } from "viem/chains";
import * as allChains from "viem/chains";

import { fhenixHelium } from "@/lib/constants";

const chains = [...Object.values(allChains), fhenixHelium];

const options: IFuseOptions<Chain> = {
	includeScore: true,
	keys: [
		{ name: "id", weight: 0.2 },
		{ name: "name", weight: 0.5 },
		{ name: "symbol", weight: 0.3 },
	],
	threshold: 0.3,
	isCaseSensitive: false,
};

const fuse = new Fuse(chains, options);

export const fuzzyMatchChain = (chainParam: string): Chain | undefined => {
	// handle edge cases
	if (["eth", "ethereum", "homestead"].includes(chainParam.toLowerCase())) {
		return allChains.mainnet;
	}

	// Check for exact chainId match
	const chainIdMatch = chains.find(
		(chain) => chain.id.toString() === chainParam,
	);
	if (chainIdMatch) {
		return chainIdMatch;
	}

	// If no exact chainId match, use Fuse.js for fuzzy search
	const results = fuse.search(chainParam);

	// Return the best match, or undefined if no matches
	return results.length > 0 ? results[0].item : undefined;
};
