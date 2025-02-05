"use client";

import { useState, FormEvent } from "react";
import Header from "@/app/(components)/Header";
import Footer from "@/app/(components)/Footer";
import { useAIRecommendations } from "@/app/hooks/useAIRecommendations";

const EXAMPLE_PROMPTS = [
  "I love dystopian novels with strong character development",
  "Looking for historical fiction set in ancient Rome",
  "Recommend me books similar to The Lord of the Rings",
  "Science fiction books with themes of artificial intelligence",
];

function formatRecommendations(text: string) {
  // Split recommendations into sections
  const recommendations = text.split("\n\n").filter(Boolean);

  return recommendations.map((recommendation, index) => {
    const lines = recommendation.split("\n");
    const formattedRec: Record<string, string> = {};

    lines.forEach((line) => {
      const [key, ...valueParts] = line.split(": ");
      const value = valueParts.join(": ");
      if (key && value) {
        formattedRec[key.toLowerCase()] = value;
      }
    });

    return (
      <div
        key={index}
        className={`p-6 rounded-lg bg-[#D9D9D9] bg-opacity-5 ${
          index !== recommendations.length - 1 ? "mb-6" : ""
        }`}
      >
        <h3 className="text-2xl font-bold text-[#a9c5a0] mb-2">
          {formattedRec.title}
        </h3>
        <div className="space-y-2">
          <p className="text-lg text-[#758173]">
            <span className="font-semibold">Author:</span> {formattedRec.author}
          </p>
          <p className="text-[#758173]">
            <span className="font-semibold">Genre:</span> {formattedRec.genre}
          </p>
          <div className="mt-4">
            <p className="font-semibold text-[#a9c5a0] mb-1">Summary:</p>
            <p className="text-[#758173]">{formattedRec.summary}</p>
          </div>
          <div className="mt-4">
            <p className="font-semibold text-[#a9c5a0] mb-1">
              Why you might like it:
            </p>
            <p className="text-[#758173]">{formattedRec.why}</p>
          </div>
        </div>
      </div>
    );
  });
}

export default function AI() {
  const [prompt, setPrompt] = useState("");
  const [showExamples, setShowExamples] = useState(true);
  const { recommendations, isLoading, error, getRecommendations } =
    useAIRecommendations();

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!prompt.trim() || prompt.trim().length < 10) {
      alert("Please provide a more detailed request");
      return;
    }

    setShowExamples(false);
    await getRecommendations(prompt);
  }

  return (
    <div>
      <Header />
      <div className="min-h-screen max-w-4xl mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-[#a9c5a0] mb-4">
            AI Book Recommendations
          </h1>
          <p className="text-[#758173]">
            Tell me about your reading preferences, favorite genres, or books
            youve enjoyed, and Ill recommend some books you might like.
          </p>
        </div>

        {showExamples && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-[#a9c5a0] mb-4">
              Example Prompts:
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {EXAMPLE_PROMPTS.map((examplePrompt, index) => (
                <button
                  key={index}
                  onClick={() => setPrompt(examplePrompt)}
                  className="text-left p-4 bg-[#D9D9D9] bg-opacity-10 rounded-lg hover:bg-opacity-20 transition-colors text-[#758173]"
                >
                  {examplePrompt}
                </button>
              ))}
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 mb-8">
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="What kind of books are you looking for?"
            className="w-full h-32 p-4 rounded-lg bg-[#D9D9D9] bg-opacity-10 text-[#a9c5a0] placeholder-gray-400 focus:ring-2 focus:ring-[#3c7a46] focus:outline-none resize-none"
            minLength={10}
            required
          />
          <button
            type="submit"
            disabled={isLoading || prompt.trim().length < 10}
            className="w-full bg-[#3c7a46] text-white py-3 px-6 rounded-lg hover:bg-[#2c5a34] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full mr-2" />
                Thinking...
              </div>
            ) : (
              "Get Recommendations"
            )}
          </button>
        </form>

        {error && (
          <div className="bg-red-500 bg-opacity-10 text-red-500 p-4 rounded-lg text-center mb-8">
            {error}
          </div>
        )}

        {recommendations && (
          <div className="animate-fade-in">
            <h2 className="text-2xl font-bold text-[#a9c5a0] mb-6">
              Your Personalized Recommendations
            </h2>
            <div className="space-y-6">
              {formatRecommendations(recommendations)}
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
