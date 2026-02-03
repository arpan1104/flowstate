import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

// Ensure GOOGLE_API_KEY is in .env.local
const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_API_KEY });

export async function POST(req: Request) {
  try {
    const { text } = await req.json();

    if (!text) {
      return new NextResponse("Missing text", { status: 400 });
    }

    const prompt = `
      You are a professional editor. 
      Correct the grammar, spelling, and punctuation.
      Input: "${text}"
      Return ONLY the corrected text.
    `;

    // FIX: Use "gemini-1.5-flash"
    // This model has a much higher quota (1500/day) than the preview models.
    // If you get a 404, change this string to "gemini-1.5-flash-001"
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash", 
      contents: prompt,
    });

    const improvedText = response.text; 

    return NextResponse.json({ improved: improvedText?.trim() });

  } catch (error: any) {
    console.error("[GEMINI_ERROR]", error);
    
    // If we hit a rate limit or quota issue, return a friendly error
    if (error.status === 429) {
        return new NextResponse("Daily AI Quota Exceeded. Please try again tomorrow.", { status: 429 });
    }

    return new NextResponse("AI Error: " + error.message, { status: 500 });
  }
}