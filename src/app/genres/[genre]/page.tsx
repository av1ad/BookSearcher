"use client";

import Footer from "@/app/(components)/Footer";
import Header from "@/app/(components)/Header";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useBooks } from "@/app/hooks/useBooks";

export default function GenrePage() {
  const pathname = usePathname();
  const genre = pathname.split("/")[2];
  const displayGenre = genre.replace(/_/g, " ").replace(/-/g, " ");

  const { books, isLoading, error } = useBooks("genre", genre);
  return (
    <div>
      <Header />
      <div className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center text-[#a9c5a0] mb-12 capitalize">
          {displayGenre} Books
        </h1>

        {error ? (
          <div className="text-red-500 text-center">{error}</div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
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
                        By: {book.authors[0]?.name || "Unknown Author"}
                      </p>
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <div className="col-span-full text-center text-xl text-[#a9c5a0]">
                No books found for this genre
              </div>
            )}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
