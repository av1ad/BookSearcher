import { useEffect, useState } from "react";

type FetchType = "random" | "search" | "author" | "genre";

export function useBooks() {
  const [books, setBooks] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState<boolean>(true);

  useEffect(() => {
    const fetchBooks = async () => {
      setIsLoading(true);
      setError(null);

      try {
      } catch {
      } finally {
      }
    };
  }, []);
  return { books, isLoading, error };
}
