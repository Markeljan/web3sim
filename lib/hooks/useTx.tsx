import { type Chain, parseEther } from "viem";
import { useSendTransaction } from "wagmi";

import { createDynamicConfig } from "@/lib/wagmi-config";

export const useTx = (chain: Chain) => {
	const { sendTransaction } = useSendTransaction({
		config: createDynamicConfig(chain),
		mutation: {
			onSuccess: () => {
				console.log("Transaction successful");
			},
			onError: (error) => {
				console.error("Transaction error", error);
			},
		},
	});

	return (
		<button
			type="button"
			onClick={() =>
				sendTransaction({
					to: "0xd2135CfB216b74109775236E36d4b433F1DF507B",
					value: parseEther("0.01"),
          data: "0x",
				})
			}
		>
			Send transaction
		</button>
	);
};
