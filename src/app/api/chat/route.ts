import {
  embeddingStore,
  extractStandaloneQuestion,
  generateEmbeddingWithRetry,
} from "@/lib/services/openai";
import { findTopProductId } from "@/lib/services/pinecone";
import { fetchProductById } from "@/lib/services/products";
import { openai } from "@ai-sdk/openai";
import { streamText, type Message } from "ai";

interface RequestBody {
  messages: Message[];
  pageContext?: string;
}
const useMock = !process.env.OPENAI_API_KEY;
export async function POST(req: Request) {
  try {
    const { messages, pageContext }: RequestBody = await req.json();

    // Fallback mock response if no key
    if (useMock) {
      return mockResponse();
    }

    // 1) Collapse chat → question
    const question = await extractStandaloneQuestion(messages.slice(-2));

    const vector = await generateEmbeddingWithRetry(question);
    embeddingStore.push({ question, vector }); // <-- store it
    console.log("Stored vectors:", embeddingStore); // just for checking
    // 2) Find best product ID
    const productId = await findTopProductId(vector);
    console.log("Product ID ====================================>", productId);
    // 3) Fetch full product details (or mock)
    const product = productId ? await fetchProductById(productId) : null;
    console.log("Product DATA ====================================>", product);

    const productInfo = product
      ? `The following product may match the user's needs. Title: "${product.title}". Description: "${product.description}". Based on the question, explain how this product is useful and relevant. At the end, include this line exactly: "Here is a product you can read more about: ${product.id}"`
      : "There is no product available.";
    const systemMessage = `
            You are a helpful assistant on an e-commerce platform.
            Your job is to help users understand if a product fits their needs, using the product description and their question.
            Be concise, clear, and friendly. Focus on usefulness and product benefits.
            ${productInfo}
            ${pageContext ? `Page context: ${pageContext}` : ""}
            
            `;

    const result = await streamText({
      model: openai("gpt-3.5-turbo"),
      system: systemMessage,
      messages: messages.slice(-2),
      temperature: 0.7,
      maxTokens: 500,
    });

    return result.toDataStreamResponse(); // ✅ streaming for useChat()
  } catch (error) {
    console.error("AI Response Error:", error);
    return new Response(
      JSON.stringify({
        error: "Failed to process request",
        message:
          error instanceof Error ? error.message : "Unknown error occurred",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
///////////////////////////////////////
//////////////////////////////////////
/////////////////////////////////////
////////////////////////////////////
////////////////////////////////////
////////////////////////////////////
///////////////////////////////////

async function mockResponse() {
  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    async start(controller) {
      const words = "This is a mock response.".split(" ");

      for (const word of words) {
        const chunk = {
          type: "delta",
          delta: {
            role: "assistant",
            content: word + " ",
          },
        };

        controller.enqueue(
          encoder.encode(`data: ${JSON.stringify(chunk)}\n\n`)
        );

        await new Promise((res) => setTimeout(res, 30));
      }

      controller.enqueue(encoder.encode(`data: {"type":"done"}\n\n`));
      controller.close();
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream", // ✅ correct
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  });
}
