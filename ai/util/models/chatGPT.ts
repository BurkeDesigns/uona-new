import type { ChatCompletionCreateParamsBase } from 'openai/resources/chat/completions';
import { openai } from '@config/ai/openai'
import { stream, streamText, streamSSE } from 'hono/streaming'

// types
type OpenAiModels = {
  model?: ChatCompletionCreateParamsBase['model']
  prompt: string
  temperature?: number
};

// export async function chatGPT(prompt) {
//   const url = "https://api.openai.com/v1/chat/completions"; // Replace with the API endpoint you want to call
//   const OPENAI_API_KEY = "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";

//   const functions = [
//     {
//       name: "create_marketing_content",
//       description: "Write marketing content",
//       parameters: {
//         type: "object",
//         properties: {
//           // name, title, company, email, phone, fax, website, and address
//           description: {
//             type: "string",
//             description: "A description of a product or service.",
//           },
//         },
//         required: ["description"],
//       },
//     },
//   ];

//   const data = {
//     model: "gpt-3.5-turbo",
//     messages: [{ role: "user", content: prompt }],
//     functions: functions,
//     function_call: "auto",
//   };

//   try {
//     const response = await fetch(url, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${OPENAI_API_KEY}`, // Replace "your_access_token" with the actual access token
//       },
//       body: JSON.stringify(data),
//     });

//     // if (!response.ok) {
//     //   throw new Error(`HTTP error! Status: ${response.status}`);
//     // }

//     let result = await response.json();
//     return result;
//   } catch (error) {
//     console.error("An error occurred:", error);
//     return error;
//   }
// }

export async function streamChatGPT(c:any, options: OpenAiModels) {
  const stream = await openai.chat.completions.create({
    model: options.model || 'gpt-4o-mini',
    temperature: options.temperature || 0,
    messages: [
    //   {
    //   role:'assistant',
    //   content: 'You are a helpful, friendly, and encouraging biblical AI assistant. Format all replys using markdown format.'
    // },
    { role: "user", content: 'Summarize topics in depth based on biblical teachings, using clear, concise simple language, relevant context, and scripture. Do not repeat yourself. Avoid listing every bible verse provided. For controversial issues, list viewpoints and their denominational supporters in detail, however identify the most biblical view. Format responses with markdown, especially for Bible quotes. Tell the user anytime a verse does not exist in the bible. '+options.prompt }],
    stream: true,
    // stop: ["\n"],
  });
  return streamText(c, async (s) => {
    for await (const chunk of stream) {
      let text = chunk.choices[0]?.delta?.content || "";
      await s.write(text);
    }
  });
}

export async function chatGPT(options: OpenAiModels) {
  const res = await openai.chat.completions.create({
    model: options.model || 'gpt-3.5-turbo',
    messages: [{ role: "user", content: options.prompt }],
  });
  return res.choices[0].message.content;
}
