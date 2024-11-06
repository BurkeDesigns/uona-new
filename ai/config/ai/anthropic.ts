import Anthropic from "@anthropic-ai/sdk";

export const anthropic = new Anthropic({
	apiKey: "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", // defaults to process.env["ANTHROPIC_API_KEY"]
});
