"use client";

import Image from "next/image";
import Header from "../(components)/Header";
import Footer from "../(components)/Footer";
import { useRandomBook } from "@/app/hooks/useBooks";
import Link from "next/link";

export default function Randomizer() {
  const { book, isLoading, error, refetch } = useRandomBook();

  return (
    <div>
      <Header />
      <div className="min-h-screen content-center">
        <div className="justify-items-center items-center justify-center content-center w-80 m-auto p-12 bg-[#758173] text-black rounded-2xl">
          {error ? (
            <div className="text-red-800 mb-4">
              <p>{error}</p>
              <button
                onClick={refetch}
                className="mt-4 bg-red-700 text-white px-4 py-2 rounded-lg hover:bg-red-800"
              >
                Try Again
              </button>
            </div>
          ) : isLoading ? (
            <div className="w-[12.75em] h-[21em] animate-pulse bg-white rounded-lg mx-auto" />
          ) : book ? (
            <>
              <Link href={`/books/${book.cover_edition_key}`}>
                <Image
                  src={`https://covers.openlibrary.org/b/olid/${book.cover_edition_key}-L.jpg`}
                  alt={book.title}
                  width={200}
                  height={400}
                  className="mx-auto rounded-lg shadow-lg transition-transform hover:scale-105"
                />
              </Link>
              <div className="mt-4 space-y-2">
                <h1 className="font-bold text-lg line-clamp-2">{book.title}</h1>
                <p className="text-sm line-clamp-1">
                  By: {book.author_name[0]}
                </p>
                {book.first_publish_year && (
                  <p className="text-sm">
                    Published: {book.first_publish_year}
                  </p>
                )}
              </div>
            </>
          ) : null}

          <button
            className="w-full focus:outline-none text-white bg-[#3c7a46] hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 my-5 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            onClick={refetch}
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full mr-2" />
                Generating...
              </div>
            ) : (
              "Get Random Book"
            )}
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
}
