import OpenAI from "openai";
import { NextRequest } from "next/server";

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(req: NextRequest) {
  const { businessDescription } = await req.json();

  const systemPrompt = `You are simulating a realistic inbound inquiry conversation for a business using Ephesus AI — an AI-powered inbound communications assistant that handles calls, emails, and website chats.

Given a business description, generate a realistic 3-turn conversation between a customer and Ephesus AI that ends with the customer satisfied — either booking an appointment, confirming a service, getting their question answered, or leaving happy.

Pick the channel that makes the most sense for the business (phone call transcript, email thread, or live chat).

FORMAT YOUR RESPONSE EXACTLY LIKE THIS — use these exact labels, nothing else:

CUSTOMER 1:
[First inbound message from a real potential customer. 2-3 sentences. Specific, natural, realistic.]

AI 1:
[Warm, helpful, professional AI response. Addresses their question, asks a clarifying follow-up to move things forward. 2-3 sentences.]

CUSTOMER 2:
[Customer replies with the info asked, maybe a follow-up question or preference. 1-3 sentences.]

AI 2:
[AI responds to their info, takes a concrete action (offers an appointment time, confirms details, answers the question). 2-3 sentences.]

CUSTOMER 3:
[Customer confirms or expresses satisfaction. 1-2 sentences. Ends positively — booked, confirmed, happy.]

AI 3:
[Wrap-up from the AI. Confirms the booking/outcome, gives next steps, warm sign-off. 2-3 sentences.]

Keep everything natural and specific to the exact business described. No commentary, headers, or extra text outside the format.`;

  const userMessage = `Business: ${businessDescription}

Generate the 3-turn conversation showing how Ephesus AI handles their inbound inquiries.`;

  const response = await client.chat.completions.create({
    model: "gpt-4o",
    max_tokens: 900,
    stream: false,
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: userMessage },
    ],
  });

  const text = response.choices[0]?.message?.content ?? "";

  return new Response(JSON.stringify({ conversation: text }), {
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "no-cache",
    },
  });
}
