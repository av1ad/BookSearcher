"use client";

/////// TO BE WORKED ON ////////

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Header from "@/app/(components)/Header";
import Footer from "@/app/(components)/Footer";
import { useAuthorBooks } from "@/app/hooks/useAuthorBooks";

export default function AuthorPage() {
  const pathname = usePathname();
  const authorId = pathname.split("/")[2];
  const { books, authorInfo, isLoading, isLoadingMore, error, hasMore, loadMore } = useAuthorBooks(authorId);

  return (
    <div>
      <Header />
      <div className="max-w-6xl mx-auto px-4 py-8">
        {error ? (
          <div className="text-red-500 text-center">{error}</div>
        ) : (
          <div>
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold text-[#a9c5a0] mb-4">
                {authorInfo?.name}
              </h1>
              {authorInfo?.birth_date && (
                <p className="text-[#758173]">
                  {authorInfo.birth_date} - {authorInfo.death_date || "Present"}
                </p>
              )}
              {authorInfo?.bio && (
                <div className="max-w-2xl mx-auto mt-6 text-[#758173]">
                  <p>
                    {typeof authorInfo.bio === "string"
                      ? authorInfo.bio
                      : authorInfo.bio.value}
                  </p>
                </div>
              )}
            </div>

            <h2 className="text-2xl font-bold text-[#a9c5a0] mb-6">
              Books by {authorInfo?.name}
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
              {isLoading ? (
                Array(6)
                  .fill(0)
                  .map((_, index) => (
                    <div
                      key={index}
                      className="w-full h-[24em] animate-pulse bg-white/10 rounded-lg"
                    />
                  ))
              ) : books.length > 0 ? (
                books.map((book: any) => (
                  <Link
                    key={book.key}
                    href={`/books/${book.key.split("/").pop()}`}
                    className="transform transition-all hover:scale-105"
                  >
                    <div className="flex flex-col h-full">
                      {book.covers?.[0] ? (
                        <Image
                          src={`https://covers.openlibrary.org/b/id/${book.covers[0]}-M.jpg`}
                          alt={book.title}
                          width={200}
                          height={300}
                          className="rounded-lg shadow-lg w-full object-cover"
                        />
                      ) : (
                        <div className="bg-white/10 w-full h-[300px] rounded-lg flex items-center justify-center">
                          <span className="text-[#a9c5a0]">No Cover</span>
                        </div>
                      )}
                      <h3 className="mt-2 text-[#a9c5a0] font-semibold line-clamp-2">
                        {book.title}
                      </h3>
                    </div>
                  </Link>
                ))
              ) : (
                <div className="col-span-full text-center text-[#758173]">
                  No books found for this author
                </div>
              )}
            </div>
            
            {books.length > 0 && hasMore && !isLoading && (
              <div className="flex justify-center mt-12">
                <button
                  onClick={loadMore}
                  disabled={isLoadingMore}
                  className="px-8 py-3 bg-[#a9c5a0] text-white rounded-xl hover:bg-[#8fb389] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                >
                  {isLoadingMore ? (
                    <>
                      <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full" />
                      <span>Loading more...</span>
                    </>
                  ) : (
                    <span>Load More Books</span>
                  )}
                </button>
              </div>
            )}
            
            {isLoadingMore && (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6 mt-6">
                {Array(8)
                  .fill(0)
                  .map((_, index) => (
                    <div
                      key={index}
                      className="w-full h-[24em] animate-pulse bg-white/10 rounded-lg"
                    />
                  ))}
              </div>
            )}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
