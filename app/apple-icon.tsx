import { ImageResponse } from "next/og";

import { APP_URL } from "@/lib/config";

export const runtime = "edge";

export const size = {
	width: 180,
	height: 180,
};

export const contentType = "image/png";

export default function Icon() {
	return new ImageResponse(
		<img
			src={`${APP_URL}/icons/icon.png
		`}
			alt="Web3 Sim Icon"
		/>,
		{
			...size,
		},
	);
}
