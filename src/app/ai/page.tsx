"use client";

import OpenAI from "openai";
import { useState } from "react";
import Header from "../(components)/Header";
import Footer from "../(components)/Footer";

export default function AI() {
  const [prompt, setPrompt] = useState<string | null>(null);
  const [recommendation, setRecommendation] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const openai = new OpenAI({
    apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
    dangerouslyAllowBrowser: true,
  });

  //   const handleSubmit = async (e) => {
  //     e.preventDefault();
  //     setLoading(true);

  const generateResponse = async (inputText: string) => {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: [
            {
              type: "text",
              text: "You are a book recommendation assistant, strictly only give book recommendations nothing",
            },
          ],
        },
        {
          role: "user",
          content: [
            {
              type: "text",
              text: inputText,
            },
          ],
        },
      ],
    });
    setRecommendation(inputText);
    setPrompt(completion.choices[0].message.content);
  };
  // Using OpenAI a user will be able to provide a prompt for the AI to generate and show a list of books from openlibrary that best match
  // what is asked

  return (
    <div>
      <Header />
      <div className="min-h-screen justify-items-center">
        <h1>AI</h1>
        <textarea
          placeholder="Give me a book similar to......"
          className="block w-[75%] p-2.5"
          value={recommendation}
          onChange={e => setRecommendation(e.target.value)}
        ></textarea>
        <button onClick={() => generateResponse(recommendation)}>
          Generate Book
        </button>
        <div>{prompt}</div>
      </div>
      <Footer />
    </div>
  );
}
