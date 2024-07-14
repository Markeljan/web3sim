import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { AI } from "@/actions/ai";
import "@/app/globals.css";
import Web3Provider from "@/components/web3-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Web3Sim",
	description: "Generastive UI for smart contracts",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={inter.className}>
				<Web3Provider>
					<AI>{children}</AI>
				</Web3Provider>
			</body>
		</html>
	);
}
