"use client";

import OpenAI from "openai";
import { useState } from "react";
import Header from "../(components)/Header";
import Footer from "../(components)/Footer";

// Using OpenAI a user will be able to provide a prompt for the AI to generate and show a list of books from openlibrary that best match
// what is asked

// Need some error handling such as if openai cannot be reached, if api key is not found

export default function AI() {
  const [prompt, setPrompt] = useState<string>("");
  const [recommendation, setRecommendation] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const openai = new OpenAI({
    apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
    dangerouslyAllowBrowser: true,
  });

  if (!openai) {
    console.log("API Key could not be found or generated.");
    return;
  }

  const generateResponse = async (inputText: string) => {
    if (!inputText.trim()) {
      setError("Please enter a prompt for a book recommendation.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: [
              {
                type: "text",
                text: "You are a book recommendation assistant. Provide detailed book recommendations including title, author, and a brief description of why this book matches the user's request. Focus on giving 2-3 specific recommendations that best match the query.",
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
      setPrompt(
        completion.choices[0].message.content || "No recommendation found."
      );
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Header />
      <div className="min-h-screen justify-items-center">
        <h1>AI</h1>
        <textarea
          placeholder="Give me a book similar to......"
          className="block w-[75%] p-2.5"
          value={recommendation}
          onChange={(e) => setRecommendation(e.target.value)}
        ></textarea>
        <button onClick={() => generateResponse(recommendation)}>
          {loading ? "Generating book...." : "Get Recommendation"}
        </button>
        <div>{error ? "Cannot fetch a recommendation" : prompt}</div>
      </div>
      <Footer />
    </div>
  );
}
