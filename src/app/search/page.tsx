"use client";

import { Suspense } from "react";
import Footer from "@/app/(components)/Footer";
import Header from "@/app/(components)/Header";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useBooks } from "@/app/hooks/useBooks";

function SearchResults() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q");
  const { books, isLoading, error } = useBooks("search", query || "");

  if (error) {
    return <div className="text-red-700 text-center m-10">{error}</div>;
  }

  return (
    <div className="text-center m-10">
      <h1 className="text-[#a9c5a0] text-xl mb-10">
        Finding all books with the query:{" "}
        <span className="font-bold underline">{query}</span>
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
        {isLoading ? (
          Array(12)
            .fill(0)
            .map((_, index) => (
              <div
                key={index}
                className="w-full h-[24em] animate-pulse bg-white/10 rounded-lg"
              />
            ))
        ) : books.length > 0 ? (
          books.map((book) => (
            <Link
              key={book.key}
              href={`/books/${book.cover_edition_key}`}
              className="transform transition-all hover:scale-105"
            >
              <div className="flex flex-col h-full">
                <Image
                  src={`https://covers.openlibrary.org/b/olid/${book.cover_edition_key}-M.jpg`}
                  alt={book.title}
                  width={200}
                  height={300}
                  className="rounded-lg shadow-lg w-full object-cover"
                />
                <div className="mt-2 space-y-1">
                  <h2 className="font-semibold text-[#a9c5a0] line-clamp-2">
                    {book.title}
                  </h2>
                  <p className="text-sm text-[#758173] line-clamp-1">
                    By: {book.author_name?.[0] || "Unknown Author"}
                  </p>
                  {book.first_publish_year && (
                    <p className="text-xs text-[#758173]">
                      {book.first_publish_year}
                    </p>
                  )}
                </div>
              </div>
            </Link>
          ))
        ) : (
          <div className="col-span-full text-xl text-[#a9c5a0]">
            No books found for {query}
          </div>
        )}
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <div>
      <Header />
      <div className="min-h-screen">
        <Suspense fallback={<div className="text-center m-10">Loading...</div>}>
          <SearchResults />
        </Suspense>
      </div>
      <Footer />
    </div>
  );
}
