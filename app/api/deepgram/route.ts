import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  // FIX: We simply return the key from your environment variables.
  // This bypasses the need for "Admin" permissions to generate temporary keys.
  const apiKey = process.env.DEEPGRAM_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      { error: "DEEPGRAM_API_KEY is missing in .env.local" }, 
      { status: 500 }
    );
  }

  // Return the key directly to the frontend
  return NextResponse.json({ key: apiKey });
}