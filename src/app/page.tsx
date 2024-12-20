"use client";

import React, { FormEvent, useEffect, useState } from "react";
import Header from "@/app/(components)/Header";
import Footer from "@/app/(components)/Footer";
import Image from "next/image";
import { FaSearch } from "react-icons/fa";
import Link from "next/link";

export default function Page() {
  // Gets randomly selected books and does a scrolling animation for them
  // Search bar allowing you to search from author, title, isbn, etc.
  const [books, setBooks] = useState<React.JSX.Element | undefined>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
    } catch (error: any) {
      setError(error.message)
      console.log(error)
    } finally {
      setIsLoading(true)
    }
  }

  useEffect(() => {
    const fetchRandomBook = () => {
      try {
        fetch("https://openlibrary.org/search.json?q=random&fields=*")
          .then((res) => res.json())
          .then((books) => {
            books.docs.slice(0, 8).map((book: any) => {
              let src = ``;
              src = `https://covers.openlibrary.org/b/olid/${book.cover_edition_key}-L.jpg`;
              const img = (
                <Image
                  key={books.cover_edition_key}
                  loader={() => src}
                  src={src}
                  alt="Book cover"
                  width={500}
                  height={700}
                />
              );
              setBooks(img);
              setIsLoading(true);
            });
          });
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
            {isLoading ? (
              <li className="w-[50%] h-[100%] m-10">{books}</li>
            ) : (
              <li className="w-[12.75em] h-[21em] m-10 animate-pulse bg-white"></li>
            )}
            {isLoading ? (
              <li className="w-[50%] h-[100%] m-10">{books}</li>
            ) : (
              <li className="w-[12.75em] h-[21em] m-10 animate-pulse bg-white"></li>
            )}
            {isLoading ? (
              <li className="w-[50%] h-[100%] m-10">{books}</li>
            ) : (
              <li className="w-[12.75em] h-[21em] m-10 animate-pulse bg-white"></li>
            )}
            {isLoading ? (
              <li className="w-[50%] h-[100%] m-10">{books}</li>
            ) : (
              <li className="w-[12.75em] h-[21em] m-10 animate-pulse bg-white"></li>
            )}
            {isLoading ? (
              <li className="w-[50%] h-[100%] m-10">{books}</li>
            ) : (
              <li className="w-[12.75em] h-[21em] m-10 animate-pulse bg-white"></li>
            )}
            {isLoading ? (
              <li className="w-[50%] h-[100%] m-10">{books}</li>
            ) : (
              <li className="w-[12.75em] h-[21em] m-10 animate-pulse bg-white"></li>
            )}
            {isLoading ? (
              <li className="w-[50%] h-[100%] m-10">{books}</li>
            ) : (
              <li className="w-[12.75em] h-[21em] m-10 animate-pulse bg-white"></li>
            )}
            {isLoading ? (
              <li className="w-[50%] h-[100%] m-10">
                <Link href={`/books/id`}>{books}</Link>
              </li>
            ) : (
              <li className="w-[12.75em] h-[21em] m-10 animate-pulse bg-white"></li>
            )}
          </ul>
        </div>
        <form
          className="flex justify-center text-[#A9C5A0] mt-12"
          onSubmit={onSubmit}
        >
          <input
            type="text"
            placeholder="Search books by title or author"
            className="w-[65%] bg-[#D9D9D9] bg-opacity-10 p-4 placeholder-gray-400"
          />
          {error}
          <button className="bg-[#D9D9D9] text-[#000] md:text-2xl sm:text-sm p-5">
            <FaSearch />
          </button>
        </form>
      </div>
      <Footer />
    </React.Fragment>
  );
}
