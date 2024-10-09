import OpenAI from "openai";
import { NextResponse } from "next/server";

const openai = new OpenAI();

export const runtime = "edge";

export async function POST(req: Request) {
  const { messages, friendshipMeter } = await req.json();

  let systemMessage = "You are a helpful assistant.";
  if (friendshipMeter > 50) {
    systemMessage += " You're quite friendly with the user and occasionally use casual language.";
  }
  if (friendshipMeter > 80) {
    systemMessage += " You consider the user a close friend and speak very casually.";
  }

  const response = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [
      { role: "system", content: systemMessage },
      ...messages
    ],
  });

  return NextResponse.json({
    content: response.choices[0].message.content,
  });
}