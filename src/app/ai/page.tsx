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
        max_tokens: 1500,
        temperature: 0.8,
        top_p: 0.9,
        frequency_penalty: 0.5,
        presence_penalty: 0.3,
        n: 1,
        stop: ["\n\n\n"],
      });

      const replacedPrompt = completion.choices[0].message.content?.replaceAll("**", "")

      setRecommendation(inputText);
      setPrompt(
        replacedPrompt || "No recommendation found."
      );
    } catch (error) {
      if (error instanceof OpenAI.APIError) {
        switch (error.status) {
          case 401:
            setError("Invalid API key. Please check your configuration.");
            break;
          case 429:
            setError("Rate limit exceeded. Please try again later.");
            break;
          case 500:
            setError("OpenAI service error. Please try again later.");
            break;
          default:
            setError("An error occurred while getting recommendations.");
        }
        console.log(error)
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Header />
      <div className="min-h-screen justify-items-center content-normal">
        <textarea
          placeholder="Give me a book similar to......"
          className="block w-[75%] mx-auto p-2.5 bg-[#4f5d4d] text-[#a9c5a0] rounded-lg m-5"
          value={recommendation}
          onChange={(e) => setRecommendation(e.target.value)}
        ></textarea>
        <button
          className="focus:outline-none text-white bg-[#3c7a46] hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 my-5 dark:bg-[#3c7a46] dark:hover:bg-green-700 dark:focus:ring-green-800"
          onClick={() => generateResponse(recommendation)}
        >
          {loading ? "Generating book...." : "Get Recommendation"}
        </button>
        <div>
          {error
            ? <div className="text-red-600">Cannot fetch a recommendation, please enter something</div>
            : <div className="m-5 text-center text-[#adc1a7] px-24 font-bold">{prompt}</div>}
        </div>
      </div>
      <Footer />
    </div>
  );
}
