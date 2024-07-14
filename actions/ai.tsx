"use server";

import type { ReactNode } from "react";

import { createAI, getMutableAIState, streamUI } from "ai/rsc";
import { z } from "zod";
import { generateId } from "ai";

import { MODEL, SYSTEM_PROMPT } from "@/lib/config";
import { SmartContractUI } from "@/components/smart-contract-ui";

export interface ServerMessage {
	role: "user" | "assistant";
	content: string;
}

export interface ClientMessage {
	id: string;
	role: "user" | "assistant";
	display: ReactNode;
}

export const continueGeneration = async (
	input: string,
): Promise<ClientMessage> => {
	"use server";

	const history = getMutableAIState();
	history.update((curentState: ServerMessage[]) => [
		...curentState,
		{ role: "user", content: input } satisfies ServerMessage,
	]);

	const result = await streamUI({
		model: MODEL,
		system: SYSTEM_PROMPT,
		messages: [...history.get(), { role: "user", content: input }],
		text: ({ content, done }) => {
			if (done) {
				history.done((messages: ServerMessage[]) => [
					...messages,
					{ role: "assistant", content } satisfies ServerMessage,
				]);
			}

			return <div>{content}</div>;
		},
		tools: {
			renderHTML: {
				description: "Render an entire webpage using the provided HTML content",
				parameters: z.object({
					html: z
						.string()
						.describe("The full HTML content for the smart contract UI"),
				}),
				generate: async ({ html }) => {
					history.done((messages: ServerMessage[]) => [
						...messages,
						{
							role: "assistant",
							content: "Done rendering the HTML content",
						},
					]);

					return <SmartContractUI html={html} />;
				},
			},
		},
	});

	return {
		id: generateId(),
		role: "assistant",
		display: result.value,
	};
};

export const AI = createAI<ServerMessage[], ClientMessage[]>({
	actions: {
		continueGeneration,
	},
	initialAIState: [],
	initialUIState: [],
});
