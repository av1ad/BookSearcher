"use client";

import { useEffect, useState, useCallback } from "react";

type QueryType = "book" | "author" | "search" | "genre" | "random";

export function useBooks(type: QueryType = "random", query?: string) {
  const [books, setBooks] = useState<any[]>([]);
  const [authorInfo, setAuthorInfo] = useState<any>(null);
  const [bookInfo, setBookInfo] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      try {
        let url;
        switch (type) {
          case "search":
            url = `https://openlibrary.org/search.json?q=${encodeURIComponent(
              query || ""
            )}&fields=*`;
            const searchResponse = await fetch(url);
            const searchData = await searchResponse.json();
            setBooks(
              searchData.docs.filter((book: any) => book.cover_edition_key)
            );
            break;
          case "book":
            // First fetch the edition info
            url = `https://openlibrary.org/books/${query}.json`;
            const editionResponse = await fetch(url);
            const editionData = await editionResponse.json();

            // Then fetch the work info using the works key
            if (editionData.works?.[0]?.key) {
              const workUrl = `https://openlibrary.org${editionData.works[0].key}.json`;
              const workResponse = await fetch(workUrl);
              const workData = await workResponse.json();

              // Combine edition and work data
              setBookInfo({
                ...editionData,
                ...workData,
                cover_id: editionData.covers?.[0],
                publishDate: editionData.publish_date,
                publisher: editionData.publishers?.[0],
              });

              // Fetch author info if available
              if (workData.authors?.[0]?.author?.key) {
                const authorUrl = `https://openlibrary.org${workData.authors[0].author.key}.json`;
                const authorResponse = await fetch(authorUrl);
                const authorData = await authorResponse.json();
                setAuthorInfo(authorData);
              }
            } else {
              throw new Error("Book information not found");
            }
            break;

          case "genre":
            url = `https://openlibrary.org/subjects/${encodeURIComponent(
              query || ""
            )}.json?details=true`;
            const genreResponse = await fetch(url);
            const genreData = await genreResponse.json();
            setBooks(genreData.works || []);
            break;

          case "random":
            url = "https://openlibrary.org/search.json?q=random&fields=*";
            const randomResponse = await fetch(url);
            const randomData = await randomResponse.json();
            setBooks(randomData.docs.slice(90, 102));
            break;

          case "author":
            url = `https://openlibrary.org/authors/${query}.json`;
            const authorResponse = await fetch(url);
            const authorData = await authorResponse.json();
            setAuthorInfo(authorData);

            const worksUrl = `https://openlibrary.org/authors/${query}/works.json`;
            const worksResponse = await fetch(worksUrl);
            const worksData = await worksResponse.json();
            setBooks(worksData.entries || []);
            break;
        }
      } catch (err) {
        setError("Failed to fetch data");
        console.error("Error fetching data:", err);
      } finally {
        setIsLoading(false);
      }
    }

    if (query || type === "random") {
      fetchData();
    }
  }, [type, query]);

  return { books, bookInfo, authorInfo, isLoading, error };
}

export function useRandomBook() {
  const [book, setBook] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchRandomBook = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        "https://openlibrary.org/search.json?q=random&fields=*"
      );
      const data = await response.json();

      const validBooks = data.docs.filter(
        (book: any) =>
          book.cover_edition_key && book.title && book.author_name?.[0]
      );

      const randomIndex = Math.floor(Math.random() * validBooks.length);
      setBook(validBooks[randomIndex]);
    } catch (err) {
      setError("Failed to fetch random book");
      console.error("Error fetching random book:", err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchRandomBook();
  }, [fetchRandomBook]);

  return { book, isLoading, error, refetch: fetchRandomBook };
}
