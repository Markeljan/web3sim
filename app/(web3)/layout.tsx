import "@/app/globals.css";
import { DynamicWidget } from "@/lib/dynamic";

export default function Web3Layout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<div className="flex flex-col min-h-screen h-full w-full mx-auto px-2 sm:px-4 lg:px-6">
			<div className="flex justify-end py-4">
				<DynamicWidget />
			</div>
			<div className="flex rounded-lg shadow-md h-full">{children}</div>
		</div>
	);
}
