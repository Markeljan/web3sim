"use server";

import { createAI, getMutableAIState, streamUI } from "ai/rsc";
import type { ReactNode } from "react";
import { z } from "zod";
import { generateId } from "ai";
import { AI_MODEL } from "@/lib/config";

export interface ServerMessage {
	role: "user" | "assistant";
	content: string;
}

export interface ClientMessage {
	id: string;
	role: "user" | "assistant";
	display: ReactNode;
}

export async function continueConversation(
	input: string,
): Promise<ClientMessage> {
	"use server";

	const history = getMutableAIState();

	const result = await streamUI({
		model: AI_MODEL,
		messages: [...history.get(), { role: "user", content: input }],
		text: ({ content, done }) => {
			if (done) {
				history.done((messages: ServerMessage[]) => [
					...messages,
					{ role: "assistant", content },
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

					// Parse the HTML string into a React component
					const SmartContractUI = () => (
						// biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
						<div dangerouslySetInnerHTML={{ __html: html }} />
					);

					return <SmartContractUI />;
				},
			},
		},
	});

	return {
		id: generateId(),
		role: "assistant",
		display: result.value,
	};
}

export const AI = createAI<ServerMessage[], ClientMessage[]>({
	actions: {
		continueConversation,
	},
	initialAIState: [],
	initialUIState: [],
});
