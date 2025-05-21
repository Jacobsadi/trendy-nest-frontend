import { type Message } from "ai";
import OpenAI from "openai";
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});
const CONFIG = {
  chunkSize: 600,
  chunkOverlap: 50, // Number of words to overlap between chunks
  maxConcurrent: 5, // Max concurrent API calls
  retryAttempts: 2,
  batchSize: 20, // Number of chunks to process in one batch
};
export async function generateEmbeddingWithRetry(
  text: string,
  attemptNumber: number = 1
): Promise<number[]> {
  try {
    const embeddingResponse = await openai.embeddings.create({
      model: "text-embedding-3-small",
      dimensions: 1536,
      input: text,
    });
    // console.log("Embeddin g------------------?", embeddingResponse)
    return embeddingResponse.data[0].embedding;
  } catch (error) {
    if (attemptNumber < CONFIG.retryAttempts) {
      const delay = Math.pow(2, attemptNumber) * 1000;
      await new Promise((resolve) => setTimeout(resolve, delay));
      return generateEmbeddingWithRetry(text, attemptNumber + 1);
    }
    throw error;
  }
}
export async function extractStandaloneQuestion(messages: Message[]) {
  const system = `You are a helpful assistant. Rewrite the following chat history into a single, standalone question that a user might search for.`;
  const resp = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      { role: "system", content: system },
      ...messages.map((m) => ({ role: m.role as any, content: m.content })),
    ],
    temperature: 0,
  });
  console.log(resp.choices[0].message.content?.trim());
  return resp.choices[0].message.content?.trim() ?? "";
}
export const embeddingStore: { question: string; vector: number[] }[] = [];
