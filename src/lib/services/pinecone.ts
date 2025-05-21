import { Pinecone } from "@pinecone-database/pinecone";

const apiKey = process.env.PINECONE_API_KEY;

if (!apiKey) {
  throw Error("PINECONE_API_KEY is not set");
}

const pinecone = new Pinecone({
  apiKey,
});
export const pc = pinecone.Index("trendy-nest");

// export async function queryPinecone(embedding: number[]) {
//   const queryResult = await pc.query({
//     vector: embedding,
//     topK: 1,
//     includeMetadata: true,
//   });

//   const match = queryResult.matches?.[0];
//   if (!match) return null;

//   return match?.id ?? null;
// }

export async function findTopProductId(
  vector: number[]
): Promise<string | null> {
  const queryResult = await pc.query({
    vector: vector,
    topK: 1,
  });

  const match = queryResult.matches?.[0];
  console.log("The found match from pine cone  ===================>", match);
  return match?.id ?? null;
}
