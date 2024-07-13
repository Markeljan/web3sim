import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "@/app/globals.css";
import { AI } from "@/actions/ai";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Web3 Sim",
	description: "Genertive UI for smart contracts",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={inter.className}>
				<AI>{children}</AI>
			</body>
		</html>
	);
}
