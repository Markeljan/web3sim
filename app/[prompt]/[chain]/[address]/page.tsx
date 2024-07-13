import { StreamUI } from "@/components/stream-ui";

export default async function Page({
	params,
}: {
	params: {
		prompt: string;
		chain: string;
		address: string;
	};
}) {
	const { prompt, chain, address } = params;

	const sanitizedPrompt = decodeURIComponent(prompt);

	return <StreamUI prompt={sanitizedPrompt} />;
}
