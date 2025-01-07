import { useEffect, useState } from "react";

export function useBooks() {
  const [books, setBooks] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  return { books, isLoading, error };
}
