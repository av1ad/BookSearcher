"use client";

import React, { FormEvent, useState } from "react";
import Header from "@/app/(components)/Header";
import Footer from "@/app/(components)/Footer";
import Image from "next/image";
import { FaSearch } from "react-icons/fa";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useBooks } from "./hooks/useBooks";

export default function Page() {
  const [searchQuery, setSearchQuery] = useState("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { books, isLoading } = useBooks();

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!searchQuery.trim()) {
      setError("Please enter a valid search");
      return;
    }

    router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
  }

  return (
    <>
      <Header />
      <div className="min-h-screen min-w-screen overflow-hidden">
        <div className="relative overflow-hidden mx-auto">
          <div className="flex animate-scroll">
            {[...Array(2)].map((_, arrayIndex) => (
              <div key={arrayIndex} className="flex shrink-0">
                {isLoading
                  ? Array(8)
                      .fill(0)
                      .map((_, index) => (
                        <div
                          key={`${arrayIndex}-loading-${index}`}
                          className="w-[12.75em] h-[21em] m-10 animate-pulse bg-white shrink-0 rounded-lg"
                        />
                      ))
                  : books.map((book) => (
                      <Link
                        key={`${arrayIndex}-${book.cover_edition_key}`}
                        href={`/books/${book.cover_edition_key}`}
                        className="shrink-0"
                      >
                        <div className="w-[12.75em] h-[21em] m-10 transition-transform hover:scale-105">
                          <Image
                            src={`https://covers.openlibrary.org/b/olid/${book.cover_edition_key}-L.jpg`}
                            alt={book.title || "Book cover"}
                            width={500}
                            height={700}
                            quality={60}
                            className="rounded-lg shadow-lg"
                          />
                        </div>
                      </Link>
                    ))}
              </div>
            ))}
          </div>
        </div>

        {error && <div className="text-red-700 text-center m-10">{error}</div>}

        <form
          className="flex justify-center text-[#A9C5A0] mt-12"
          onSubmit={onSubmit}
        >
          <input
            type="text"
            value={searchQuery}
            placeholder="Search books by title or author"
            className="w-[65%] bg-[#D9D9D9] bg-opacity-10 p-4 placeholder-gray-400 rounded-l"
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button
            type="submit"
            className="bg-[#D9D9D9] text-[#000] md:text-2xl sm:text-sm p-5 rounded-r hover:bg-opacity-90 transition-colors"
          >
            <FaSearch />
          </button>
        </form>
      </div>
      <Footer />
    </>
  );
}
