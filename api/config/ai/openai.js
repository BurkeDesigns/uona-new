import OpenAI from "openai";

export const openai = new OpenAI({
  apiKey: Bun.env.OPENAI_API_KEY, // defaults to process.env["OPENAI_API_KEY"]
});
