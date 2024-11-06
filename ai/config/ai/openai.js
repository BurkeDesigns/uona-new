import OpenAI from "openai";

export const openai = new OpenAI({
  apiKey: "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", // defaults to process.env["OPENAI_API_KEY"]
});