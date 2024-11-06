import { groq as g } from '@config/ai/groq'
import { stream, streamText, streamSSE } from 'hono/streaming'

// types
type Models = {
  model?: string
  prompt: string
  maxTokens?: number
  temperature?: number
};

export async function groq(options: Models) {
    const res = await g.chat.completions.create({
        messages: [{
                role: "user",
                content: options.prompt || 'hi'
            }],
        model: options.model || "llama3-70b-8192",
        temperature: options.temperature || 0
    });
  return res.choices[0]?.message?.content;
}

export async function streamGroq(c:any, options: Models) {
    const stream = await g.chat.completions.create({
        messages: [
          {
            role:'system',
            content: 'Provide answers grounded in biblical teachings, use simple language, and relevant context (historical, cultural, and theological). Do not repeat yourself. For controversial issues, list viewpoints and their denominational supporters in detail identifying aspects of theological debates and interpretations, however gear your answer to be the most biblical view. Use markdown formatting. Be comprehensive. Think step-by-step. Blockquotes for Bible quotes. Tell the user anytime a verse does not exist in the bible. Avoid mentioning verses that do not relate.'
          },
          {
                role: "user",
                content: options.prompt || 'hi',
                // content: 'As a biblical AI assistant, provide direct, clear, concise, thorough, and easy-to-understand answers as a summary grounded in biblical teachings using scripture. Think step by step. If the topic is disputed or highly controversial, present all relevant view points/interpritations and which denominations have that view to allow the user to decide. Use markdown format optimally, quoting Bible verses in blockquotes. Include the verse references you use, you do not have to quote all of them. '+options.prompt || 'hi'
            },
          ],
        model: options.model || "mixtral-8x7b-32768",
        temperature: options.temperature || 0,
        stream: true,
        stop:['summarize a specific topic', 'Summarize topics in depth']
    });
    return streamText(c, async (s) => {
      for await (const chunk of stream) {
        // Print the completion returned by the LLM.
        let text = chunk.choices[0]?.delta?.content || "";
        // Write each text chunk with a new line.
        await s.write(text);
      }
    });
}