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
      <div className="min-h-screen content-center p-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8 text-center">
            <button
              className="inline-block focus:outline-none text-white bg-[#3c7a46] hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-8 py-3 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
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

          {error ? (
            <div className="text-red-800 mb-4 text-center">
              <p>{error}</p>
              <button
                onClick={refetch}
                className="mt-4 bg-red-700 text-white px-4 py-2 rounded-lg hover:bg-red-800"
              >
                Try Again
              </button>
            </div>
          ) : isLoading ? (
            <div className="w-[12.75em] h-[21em] animate-pulse bg-white/10 rounded-lg mx-auto" />
          ) : book ? (
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                {book.cover_edition_key ? (
                  <Image
                    src={`https://covers.openlibrary.org/b/olid/${book.cover_edition_key}-L.jpg`}
                    alt={book.title}
                    width={400}
                    height={600}
                    className="rounded-lg shadow-lg"
                  />
                ) : (
                  <div className="w-full h-[600px] bg-white/10 rounded-lg flex items-center justify-center">
                    <span className="text-[#a9c5a0]">No Cover Available</span>
                  </div>
                )}
              </div>
              <div className="space-y-6">
                <h1 className="text-4xl font-bold text-[#a9c5a0]">
                  {book.title}
                </h1>
                {book.author_name && (
                  <Link
                    href={`/authors/${book.author_key?.[0]}`}
                    className="text-xl text-[#758173] hover:text-[#a9c5a0] transition-colors"
                  >
                    By: {book.author_name[0]}
                  </Link>
                )}
                {book.first_publish_year && (
                  <p className="text-[#758173]">
                    Published: {book.first_publish_year}
                    {book.publisher?.[0] && ` by ${book.publisher[0]}`}
                  </p>
                )}
                {book.description && (
                  <div className="prose text-[#758173]">
                    <h2 className="text-2xl font-semibold text-[#a9c5a0] mb-2">
                      Description
                    </h2>
                    <p>
                      {typeof book.description === "string"
                        ? book.description
                        : book.description.value}
                    </p>
                  </div>
                )}
                {book.subject && (
                  <div className="space-y-2">
                    <h2 className="text-xl font-semibold text-[#a9c5a0]">
                      Subjects
                    </h2>
                    <div>
                      {book.subject.slice(0, 5).map((subject: string) => (
                        <Link
                          key={subject}
                          href={`/genres/${subject
                            .toLowerCase()
                            .replace(/\s+/g, "_")}`}
                          className="inline-block bg-[#3c7a46] text-white px-3 py-1 rounded-full text-sm mr-2 mb-2 hover:bg-[#2c5a34] transition-colors"
                        >
                          {subject}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
                <div className="pt-4">
                  <a
                    href={`https://openlibrary.org${book.key}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#a9c5a0] hover:text-[#758173] transition-colors"
                  >
                    View on OpenLibrary →
                  </a>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </div>
      <Footer />
    </div>
  );
}
