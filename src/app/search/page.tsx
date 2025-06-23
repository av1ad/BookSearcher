"use client";

import { Suspense } from "react";
import Footer from "@/app/(components)/Footer";
import Header from "@/app/(components)/Header";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useSearchBooks } from "@/app/hooks/useSearchBooks";

function SearchResults() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";
  const { books, isLoading, isLoadingMore, error, hasMore, totalFound, loadMore } = useSearchBooks(query);

  if (error && !isLoading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-red-500 bg-opacity-10 border border-red-500 border-opacity-20 rounded-lg p-4 text-red-400 text-center">
          {error}
        </div>
      </div>
    );
  }

  if (!query) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl text-gray-400 mb-4">No search query provided</h1>
        <p className="text-gray-500">Please enter a search term to find books.</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Search Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">
          Search Results
        </h1>
        <p className="text-gray-300">
          {isLoading ? (
            "Searching..."
          ) : totalFound > 0 ? (
            <>
              Found <span className="text-[#a9c5a0] font-semibold">{totalFound.toLocaleString()}</span> books for{" "}
              <span className="text-[#a9c5a0] font-semibold">&ldquo;{query}&rdquo;</span>
            </>
          ) : (
            <>No books found for &ldquo;{query}&rdquo;</>
          )}
        </p>
      </div>

      {/* Results Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-6">
        {isLoading && books.length === 0 ? (
          // Initial loading state
          Array(20)
            .fill(0)
            .map((_, index) => (
              <div key={index} className="animate-pulse">
                <div className="w-full h-72 bg-gray-700 rounded-xl mb-3" />
                <div className="h-4 bg-gray-700 rounded mb-2" />
                <div className="h-3 bg-gray-700 rounded w-2/3" />
              </div>
            ))
        ) : books.length > 0 ? (
          <>
            {books.map((book, index) => (
              <Link
                key={`${book.key}-${index}`}
                href={`/books/${book.cover_edition_key}`}
                className="group card-hover"
              >
                <div className="glass-effect rounded-xl overflow-hidden p-4 h-full flex flex-col">
                  <div className="relative mb-3 flex-shrink-0">
                    <Image
                      src={`https://covers.openlibrary.org/b/olid/${book.cover_edition_key}-M.jpg`}
                      alt={book.title}
                      width={200}
                      height={280}
                      quality={80}
                      className="rounded-lg shadow-lg w-full object-cover h-64"
                    />
                  </div>
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <h2 className="font-semibold text-white text-sm line-clamp-2 mb-2 group-hover:text-[#a9c5a0] transition-colors">
                        {book.title}
                      </h2>
                      <p className="text-xs text-gray-400 line-clamp-1 mb-1">
                        {book.author_name?.[0] || "Unknown Author"}
                      </p>
                    </div>
                    {book.first_publish_year && (
                      <p className="text-xs text-gray-500 mt-auto">
                        {book.first_publish_year}
                      </p>
                    )}
                  </div>
                </div>
              </Link>
            ))}
            
            {/* Load More Loading State */}
            {isLoadingMore && (
              Array(8)
                .fill(0)
                .map((_, index) => (
                  <div key={`loading-${index}`} className="animate-pulse">
                    <div className="w-full h-72 bg-gray-700 rounded-xl mb-3" />
                    <div className="h-4 bg-gray-700 rounded mb-2" />
                    <div className="h-3 bg-gray-700 rounded w-2/3" />
                  </div>
                ))
            )}
          </>
        ) : !isLoading ? (
          <div className="col-span-full text-center py-16">
            <div className="text-6xl mb-4">📚</div>
            <h2 className="text-2xl font-semibold text-gray-300 mb-2">
              No books found
            </h2>
            <p className="text-gray-500">
              Try searching with different keywords or check your spelling.
            </p>
          </div>
        ) : null}
      </div>

      {/* Load More Button */}
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

      {/* Results Summary */}
      {books.length > 0 && (
        <div className="text-center mt-8 text-gray-400 text-sm">
          Showing {books.length} of {totalFound.toLocaleString()} books
        </div>
      )}
    </div>
  );
}

export default function SearchPage() {
  return (
    <div>
      <Header />
      <div className="min-h-screen">
        <Suspense fallback={
          <div className="flex items-center justify-center min-h-[50vh]">
            <div className="animate-spin h-8 w-8 border-2 border-[#a9c5a0] border-t-transparent rounded-full" />
          </div>
        }>
          <SearchResults />
        </Suspense>
      </div>
      <Footer />
    </div>
  );
}
