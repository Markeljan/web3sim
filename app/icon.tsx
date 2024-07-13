import { ImageResponse } from "next/og";

import Web3SimIcon from "icons/icon.png";

export const runtime = "edge";

export const size = {
	width: 32,
	height: 32,
};

export const contentType = "image/png";

export default function Icon() {
	return new ImageResponse(<img src={Web3SimIcon.src} alt="Web3Sim" />, {
		...size,
	});
}
