"use client";

import { Suspense, useEffect, useState, ReactNode } from "react";
import Footer from "@/app/(components)/Footer";
import Header from "@/app/(components)/Header";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

function SearchResults() {
  const [books, setBooks] = useState<Array<ReactNode>>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const searchParams = useSearchParams();
  const query = searchParams.get("q");

  function loadMoreBtn() {
    setError(null);
  }

  useEffect(() => {
    const displayBooks = async () => {
      try {
        const data = await fetch(
          `https://openlibrary.org/search.json?q=${query}`
        );
        const response = await data.json();
        const book = response.docs;
        console.log(book);
        const bookInfo = book.map((books: any) => {
          const author = books.author_name;
          const title = books.title;
          const bookImage = `https://covers.openlibrary.org/b/olid/${books.cover_edition_key}-M.jpg`;

          return (
            <div
              key={books.key || Math.random()}
              className="flex flex-col justify-items-center align-middle m-5"
            >
              {books.cover_edition_key ? (
                <Image
                  key={books.cover_edition_key}
                  loader={() => bookImage}
                  src={bookImage}
                  alt="Book cover"
                  width={200}
                  height={200}
                  quality={60}
                  className="mb-4"
                />
              ) : (
                <div className="bg-white w-[10em] h-[16em] flex items-center justify-center text-center text-lg mb-4">
                  <span className="text-black opacity-100">No Cover Found</span>
                </div>
              )}

              <p className="font-bold text-lg text-[#a9c5a0]">{title}</p>
              <p className="text-[#a9c5a0]">By: {author}</p>
            </div>
          );
        });
        setBooks(bookInfo);
        setIsLoading(false);
      } catch (error) {
        if (error instanceof Error) {
          throw new Error("Could not find or load books", error);
        } else {
          throw new Error("");
        }
      } finally {
        setIsLoading(false);
      }
    };

    if (query) {
      displayBooks();
    }
  }, [query]);

  return (
    <div className="text-center m-10">
      <h1 className="text-[#a9c5a0] text-xl mb-10">
        Finding all books with the query:{" "}
        <span className="font-bold underline">{query}</span>
      </h1>
      {error ? <div className="text-center m-5 text-red-700">{error}</div> : ""}
      <div className="grid grid-cols-6 gap-7 justify-items-center list-none">
        {isLoading
          ? Array(12)
              .fill(0)
              .map((_, index) => (
                <li
                  key={index}
                  className="w-[12.75em] h-[21em] m-10 animate-pulse bg-white"
                ></li>
              ))
          : books.slice(0, 12).map((book, index) => (
              <Link key={index} href={`/books/${index}`}>
                {book}
              </Link>
            ))}
      </div>
      <button
        onClick={() => loadMoreBtn()}
        className="focus:outline-none text-white bg-[#3c7a46] hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 my-5 dark:bg-[#3c7a46] dark:hover:bg-green-700 dark:focus:ring-green-800"
      >
        Load More
      </button>
    </div>
  );
}

export default function SearchPage() {
  return (
    <div>
      <Header />
      <div className="min-h-screen flex flex-col">
        <Suspense fallback={<div>Loading...</div>}>
          <SearchResults />
        </Suspense>
      </div>
      <Footer />
    </div>
  );
}
