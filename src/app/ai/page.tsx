"use client"

import OpenAI from "openai";
import { useState } from "react";
import Header from "../(components)/Header";
import Footer from "../(components)/Footer";

export default function AI() {

    const [prompt, setPrompt] = useState('')
    const [recommendation, setRecommendation] = useState('')
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null); 



  const openai = new OpenAI({
    apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
    dangerouslyAllowBrowser: true,
  });

  try {
      async function open() {
        const completion = await openai.chat.completions.create({
          model: "",
          messages: [
            { role: "system", content: "You are a book recommendation assistant" },
            {
              role: "user",
              content: "Give me a book recommandation based on Norwegian Wood",
            },
          ],
        });
        console.log(completion.choices[0].message);
      }
  } catch {
    setError(error)
  }
  // Using OpenAI a user will be able to provide a prompt for the AI to generate and show a list of books from openlibrary that best match
  // what is asked

  return (
    <div>
      <Header />
      <h1>AI</h1>
      <textarea></textarea>
      <button onClick={() => open()}></button>
      <Footer />
    </div>
  );
}
