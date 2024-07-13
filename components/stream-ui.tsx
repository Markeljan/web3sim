"use client";

import { useState, useEffect, useCallback } from "react";

import { useActions, useUIState } from "ai/rsc";
import { generateId } from "ai";

import type { ClientMessage } from "@/actions/ai";

export const StreamUI = ({ prompt }: { prompt: string }) => {
	const [input, setInput] = useState<string>("");
	const [conversation, setConversation] = useUIState();
	const { continueConversation } = useActions();

	const initializeConversation = useCallback(async () => {
		if (prompt && conversation.length === 0) {
			const message = await continueConversation(prompt);
			setConversation([message]);
		}
	}, [prompt, conversation.length, continueConversation, setConversation]);

	useEffect(() => {
		initializeConversation();
	}, [initializeConversation]);

	const handleSendMessage = async (e: React.FormEvent) => {
		e.preventDefault();
		setConversation((currentConversation: ClientMessage[]) => [
			...currentConversation,
			{ id: generateId(), role: "user", display: input },
		]);

		const message = await continueConversation(input);

		setConversation((currentConversation: ClientMessage[]) => [
			...currentConversation,
			message,
		]);

		setInput("");
	};

	return (
		<div className="flex flex-col h-screen">
			<div className="flex-grow overflow-auto p-4">
				{conversation.map((message: ClientMessage) => (
					<div key={message.id} className="mb-4">
						{message.display}
					</div>
				))}
			</div>
			<form onSubmit={handleSendMessage} className="p-4 border-t">
				<div className="flex">
					<input
						type="text"
						value={input}
						onChange={(event) => setInput(event.target.value)}
						className="flex-grow mr-2 p-2 border rounded"
						placeholder="Type your message..."
					/>
					<button type="submit" className="bg-blue-500 text-white p-2 rounded">
						Send
					</button>
				</div>
			</form>
		</div>
	);
};
