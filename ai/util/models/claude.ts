import { estTokens } from '../../bible/bible';
import { increaseStat } from '../../db';
import { anthropic } from '../config/anthropic'
import { stream, streamText, streamSSE } from 'hono/streaming'

// types
type Models = {
  model?: string
  prompt: string
  maxTokens?: number
  temperature?: number
};

export async function claude(c:any, options: Models) {
  const res = await anthropic.messages.create({
    model: options.model || "claude-3-haiku-20240307",
    max_tokens: options.maxTokens || 1000,
    temperature: options.temperature || 0,
    messages: [{role: "user", "content": [{
            "type": "text",
            "text": options.prompt || 'hi'
          }]
      }
    ]
  });
  try {
    let inputTokens = res.usage.input_tokens;
    let outputTokens = res.usage.output_tokens;
    await Promise.all([increaseStat(c, 'Total Input Tokens', inputTokens), increaseStat(c, 'Total Output Tokens', outputTokens)]);
  } catch (error) {
    console.log(error);
  }
  return res.content[0].text;
}

export async function streamClaude(c:any, options: Models) {
  const stream = await anthropic.messages.stream({
    model: options.model || "claude-3-haiku-20240307",
    max_tokens: options.maxTokens || 1000,
    temperature: options.temperature || 0,
    // system: "You are a helpful, friendly, relational, and encouraging biblical AI assistant. Be direct and answer a users query based on what the bible says. Make christian concepts easy to understand. Make the answer comprehensive but brief/short and to the point. Do not abbrivate verse references. List all relevant verses you used to answer the question. Format all replys using markdown format best practices. Use blockquotes for bible verse only. ",
    system: `Provide answers grounded in biblical teachings, use simple language, and relevant context (historical, cultural, and theological). Do not repeat yourself. For controversial issues, list viewpoints and their denominational supporters in detail identifying aspects of theological debates and interpretations, however gear your answer to be the most biblical view. Use markdown formatting. Be comprehensive. Think step-by-step. Blockquotes for Bible quotes. Tell the user anytime a verse does not exist in the bible. `,
    messages: [
      {role: "user", "content": [{
            "type": "text",
            "text": options.prompt || 'hi'
          }]
      }
    ],
  });

  return streamText(c, async (s) => {
    let content = [];
    // console.log(JSON.stringify(stream, null, 4));
    for await (const chunk of stream) {
      // console.log(JSON.stringify(chunk, null, 4));
      if(chunk.type == 'content_block_delta'){
        content.push(chunk.delta.text);
        await s.write(chunk.delta.text || '');
      }
    }
    try {
      // console.log(JSON.stringify(stream, null, 4));
      let inputTokens = stream.receivedMessages[0].usage.input_tokens;
      let outputTokens = estTokens(content.join(''));
      await Promise.all([increaseStat(c, 'Total Input Tokens', inputTokens), increaseStat(c, 'Total Output Tokens', outputTokens)]);
    } catch (error) {
      console.log(error);
    }
  });
}