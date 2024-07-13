import { createAnthropic } from "@ai-sdk/anthropic";
import { createOpenAI } from "@ai-sdk/openai";

export const anthropic = createAnthropic();
export const openai = createOpenAI();

export const AI_MODEL = anthropic("claude-3-5-sonnet-20240620");
// export const AI_MODEL = openai("gpt-4o");
