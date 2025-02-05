"use client";

import { useState, useCallback } from "react";

export function useAIRecommendations() {
  const [recommendations, setRecommendations] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getRecommendations = useCallback(async (prompt: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/recommendations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      });

      if (!response.ok) {
        throw new Error("Failed to get recommendations");
      }

      const data = await response.json();
      setRecommendations(data.recommendations);
    } catch (err) {
      setError("Failed to get recommendations. Please try again.");
      console.error("Error getting recommendations:", err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { recommendations, isLoading, error, getRecommendations };
}
