"use client";

import React, { FormEvent, useEffect, useState } from "react";
import Header from "@/app/(components)/Header";
import Footer from "@/app/(components)/Footer";
import Image from "next/image";
import { FaSearch } from "react-icons/fa";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Page() {
  // Gets randomly selected books and does a scrolling animation for them
  // Search bar allowing you to search from author, title, isbn, etc.
  const [bookCover, setBookCover] = useState<React.JSX.Element[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const router = useRouter();

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      if (!searchQuery.trim()) {
        throw new Error("Please enter a valid search");
      }
      router.push(`/search/${encodeURIComponent(searchQuery)}`);
    } catch (error: any) {
      setError(error.message);
      console.log(error);
    } finally {
      setIsLoading(true);
    }
  }

  useEffect(() => {
    const fetchRandomBook = async () => {
      try {
        const data = await fetch(
          "https://openlibrary.org/search.json?q=random&fields=*"
        );
        const response = await data.json();
        const books = response.docs.slice(90, 102);
        console.log(books);
        const bookImages = books.map((book: any) => {
          const src = `https://covers.openlibrary.org/b/olid/${book.cover_edition_key}-L.jpg`;
          return (
            <Image
              key={book.cover_edition_key}
              loader={() => src}
              src={src}
              alt="Book cover"
              width={500}
              height={700}
              quality={60}
            />
          );
        });
        setBookCover(bookImages);
      } catch {
        console.log("cant fetch books...trying again");
      } finally {
        setIsLoading(false);
      }
    };
    fetchRandomBook();
  }, []);

  // For searching I'll use next/redirect to redirect to search/{id} (able to search using isbn, author, title)
  return (
    <React.Fragment>
      <Header />
      <div className="min-h-screen min-w-screen overflow-hidden">
        <div className="w-[calc(550px*8)] animate-scroll">
          <ul className="grid grid-cols-12 justify-items-center whitespace-nowrap">
            {/* Main loading */}
            {isLoading
              ? Array(12)
                  .fill(0)
                  .map((_, index) => (
                    <li
                      key={index}
                      className="w-[12.75em] h-[21em] m-10 animate-pulse bg-white"
                    ></li>
                  ))
              : bookCover.map((cover, index) => (
                  <Link key={index} href={`/books/${index}`}>
                    <div className="w-[12.75em] h-[21em] m-10">{cover}</div>
                  </Link>
                ))}

            {/* Duplicate loading */}
          </ul>
        </div>

        {error ? <div className="text-red-700 text-center m-10">{error}</div> : ""}

        <form
          className="flex justify-center text-[#A9C5A0] mt-12"
          onSubmit={onSubmit}
        >
          <input
            type="text"
            value={searchQuery}
            placeholder="Search books by title or author"
            className="w-[65%] bg-[#D9D9D9] bg-opacity-10 p-4 placeholder-gray-400"
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button
            type="submit"
            className="bg-[#D9D9D9] text-[#000] md:text-2xl sm:text-sm p-5"
          >
            <FaSearch />
          </button>
        </form>
      </div>
      <Footer />
    </React.Fragment>
  );
}
