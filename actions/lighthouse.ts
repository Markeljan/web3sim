"use server";

import lighthouse from "@lighthouse-web3/sdk";

import { LIGHTHOUSE_API_KEY } from "@/lib/config";

export const ipfsUploadText = async (
	text: string,
): Promise<string | undefined> => {
	const response = await lighthouse.uploadText(text, LIGHTHOUSE_API_KEY);
	return response.data.cid;
};

export const ipfsGetUploads = async () => {
	const response = await lighthouse.getUploads(LIGHTHOUSE_API_KEY);
	return response.data;
};

export const ipfsGetDealStatus = async (cid: string) => {
	const response = await lighthouse.dealStatus(cid);
	return response.data;
};

// fetch a file from IPFS
export const ipfsFetch = async (cid: string) => {
	const response = await fetch(
		`https://gateway.lighthouse.storage/ipfs/${cid}`,
	);

	const data = await response.text();
	return data;
};
