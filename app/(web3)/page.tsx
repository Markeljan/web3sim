import { ipfsGetUploads } from "@/actions/lighthouse";
import { StreamUI } from "@/components/stream-ui";

import { APP_URL } from "@/lib/config";

export default async function Page({
	params,
}: {
	params: {
		chain: string;
	};
}) {
	const uploadsResponse = await ipfsGetUploads();

	const prompt = `Instead of generating smart contract UIs, generate a UI to display this list of dapps genereated by users.  They should all have anchor tags that link to ${APP_URL} Map over the uploadsResponse.fileList and display them in a nice way.`;
	return (
		<StreamUI
			prompt={prompt}
			data={{
				total: uploadsResponse.totalFiles,
				uploads: uploadsResponse.fileList,
			}}
		/>
	);
}
