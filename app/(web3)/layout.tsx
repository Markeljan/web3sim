import "@/app/globals.css";
import { DynamicWidget } from "@/lib/dynamic";

export default function Web3Layout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<div className="flex flex-col min-h-screen bg-gray-100">
			<div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex justify-end py-4">
					<DynamicWidget />
				</div>
				<div className="rounded-lg shadow-md overflow-hidden">{children}</div>
			</div>
		</div>
	);
}
