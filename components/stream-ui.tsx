"use client";

import { useCallback, useEffect, useState } from "react";

import { generateId } from "ai";
import { useActions, useUIState } from "ai/rsc";

import type { ClientMessage } from "@/actions/ai";
import type { ContractInfo } from "@/actions/explorer";

export const StreamUI = ({
	prompt,
	contractData,
}: { prompt: string; contractData: ContractInfo }) => {
	const [input, setInput] = useState<string>("");
	const [generation, setGeneration] = useUIState();
	const { continueGeneration } = useActions();

	const initializeConversation = useCallback(async () => {
		if (prompt && generation.length === 0) {
			const message = await continueGeneration(prompt, contractData);
			console.log("Message:", message);
			setGeneration([message]);
		}
	}, [
		prompt,
		contractData,
		generation.length,
		continueGeneration,
		setGeneration,
	]);

	useEffect(() => {
		initializeConversation();
	}, [initializeConversation]);

	const handleSendMessage = async (e: React.FormEvent) => {
		e.preventDefault();
		setGeneration((currentGeneration: ClientMessage[]) => [
			...currentGeneration,
			{ id: generateId(), role: "user", display: input },
		]);

		const message = await continueGeneration(input);

		setGeneration((currentConversation: ClientMessage[]) => [
			...currentConversation,
			message,
		]);

		setInput("");
	};

	return (
		<div className="flex flex-col">
			<div className="flex-grow overflow-auto p-4">
				{generation.map((message: ClientMessage) => (
					<div key={message.id} className="mb-4 w-full mx-auto">
						{message.display}
					</div>
				))}
			</div>
			<form onSubmit={handleSendMessage} className="p-4 border-t bg-white">
				<div className="flex w-full mx-auto">
					<input
						type="text"
						value={input}
						onChange={(event) => setInput(event.target.value)}
						className="flex-grow mr-2 p-2 border rounded"
						placeholder="Request changes here..."
					/>
					<button type="submit" className="bg-blue-500 text-white p-2 rounded">
						Submit
					</button>
				</div>
			</form>
		</div>
	);
};
