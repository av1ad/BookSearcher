import OpenAI from "openai";
import { NextResponse } from "next/server";

const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
});

const SYSTEM_PROMPT = `You are an expert librarian and book recommender. Your recommendations should be detailed and personalized.
For each recommendation, provide the following format:

Title: [Book Title]
Author: [Author Name]
Genre: [Genre]
Summary: [Brief plot summary]
Why: [Why this matches the user's preferences]
Provide 3-5 book recommendations.
Separate each recommendation with a blank line.`;
export async function POST(request: Request) {
  try {
    const { prompt } = await request.json();

    if (!prompt || prompt.trim().length < 10) {
      return NextResponse.json(
        { error: "Please provide a more detailed request" },
        { status: 400 }
      );
    }

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: SYSTEM_PROMPT,
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.7,
      max_tokens: 1000,
      presence_penalty: 0.3,
      frequency_penalty: 0.3,
    });

    return NextResponse.json({
      recommendations: response.choices[0].message.content,
    });
  } catch (error: any) {
    console.error("OpenAI API error:", error);
    return NextResponse.json(
      { error: error?.message || "Failed to get recommendations" },
      { status: error?.status || 500 }
    );
  }
}
