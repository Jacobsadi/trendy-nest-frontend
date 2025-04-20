// pdfTextExtractor.ts
import pdfParse from "pdf-parse";

export async function extractTextFromPdf(fileBuffer: Buffer): Promise<string> {
  try {
    const data = await pdfParse(fileBuffer);
    return data.text;
  } catch (error) {
    console.error("Error extracting text from PDF:", error);
    throw new Error("Failed to extract text from PDF.");
  }
}
