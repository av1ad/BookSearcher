"use client";

import { useState, FormEvent } from "react";
import Header from "@/app/(components)/Header";
import Footer from "@/app/(components)/Footer";
import { useAIRecommendations } from "@/app/hooks/useAIRecommendations";

export default function AI() {
  const [prompt, setPrompt] = useState("");
  const { recommendations, isLoading, error, getRecommendations } = useAIRecommendations();

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!prompt.trim()) return;
    
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
            Describe what youre looking for, and Ill recommend some books you might enjoy.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 mb-8">
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Example: I enjoy science fiction novels with strong female protagonists and complex world-building..."
            className="w-full h-32 p-4 rounded-lg bg-[#D9D9D9] bg-opacity-10 text-[#a9c5a0] placeholder-gray-400 focus:ring-2 focus:ring-[#3c7a46] focus:outline-none"
          />
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#3c7a46] text-white py-3 px-6 rounded-lg hover:bg-[#2c5a34] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full mr-2" />
                Getting Recommendations...
              </div>
            ) : (
              "Get Recommendations"
            )}
          </button>
        </form>

        {error && (
          <div className="text-red-500 text-center mb-8">
            {error}
          </div>
        )}

        {recommendations && (
          <div className="bg-[#D9D9D9] bg-opacity-10 p-6 rounded-lg">
            <h2 className="text-xl font-semibold text-[#a9c5a0] mb-4">
              Your Personalized Recommendations
            </h2>
            <div className="prose text-[#758173] max-w-none whitespace-pre-line">
              {recommendations}
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
