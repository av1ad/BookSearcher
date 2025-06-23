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
        {/* Hero Section */}
        <div className="text-center py-16 px-4">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Discover Your Next
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#a9c5a0] to-[#c6dec6]">
              {" "}Great Read
            </span>
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Explore millions of books, get AI-powered recommendations, and build your personal reading list
          </p>
        </div>

        {/* Featured Books Carousel */}
        <div className="relative overflow-hidden mb-16">
          <div className="flex animate-scroll">
            {[...Array(2)].map((_, arrayIndex) => (
              <div key={arrayIndex} className="flex shrink-0">
                {isLoading
                  ? Array(8)
                      .fill(0)
                      .map((_, index) => (
                        <div
                          key={`${arrayIndex}-loading-${index}`}
                          className="w-48 h-72 m-4 animate-pulse bg-gray-700 shrink-0 rounded-xl"
                        />
                      ))
                  : books.map((book) => (
                      <Link
                        key={`${arrayIndex}-${book.cover_edition_key}`}
                        href={`/books/${book.cover_edition_key}`}
                        className="shrink-0 group"
                      >
                        <div className="w-48 h-72 m-4 card-hover rounded-xl overflow-hidden shadow-lg">
                          <Image
                            src={`https://covers.openlibrary.org/b/olid/${book.cover_edition_key}-L.jpg`}
                            alt={book.title || "Book cover"}
                            width={192}
                            height={288}
                            quality={80}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </Link>
                    ))}
              </div>
            ))}
          </div>
        </div>

        {/* Search Section */}
        <div className="max-w-4xl mx-auto px-4 pb-16">
          {error && (
            <div className="mb-6 p-4 bg-red-500 bg-opacity-10 border border-red-500 border-opacity-20 rounded-lg text-red-400 text-center">
              {error}
            </div>
          )}

          <form onSubmit={onSubmit} className="relative">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                placeholder="Search for books, authors, or genres..."
                className="w-full bg-gray-800 bg-opacity-50 text-white placeholder-gray-400 px-6 py-4 pr-14 rounded-2xl border border-gray-600 focus:border-[#a9c5a0] focus:ring-2 focus:ring-[#a9c5a0] focus:ring-opacity-20 focus:outline-none transition-all backdrop-blur-sm"
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-[#a9c5a0] text-white p-3 rounded-xl hover:bg-[#8fb389] transition-colors"
              >
                <FaSearch size={18} />
              </button>
            </div>
          </form>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            <Link
              href="/genres"
              className="group p-6 glass-effect rounded-2xl hover:bg-opacity-80 transition-all duration-300"
            >
              <div className="text-2xl mb-3">📚</div>
              <h3 className="text-lg font-semibold text-white mb-2">Browse Genres</h3>
              <p className="text-gray-400 text-sm">Explore books by category</p>
            </Link>
            
            <Link
              href="/ai"
              className="group p-6 glass-effect rounded-2xl hover:bg-opacity-80 transition-all duration-300"
            >
              <div className="text-2xl mb-3">🤖</div>
              <h3 className="text-lg font-semibold text-white mb-2">AI Recommendations</h3>
              <p className="text-gray-400 text-sm">Get personalized suggestions</p>
            </Link>
            
            <Link
              href="/randomizer"
              className="group p-6 glass-effect rounded-2xl hover:bg-opacity-80 transition-all duration-300"
            >
              <div className="text-2xl mb-3">🎲</div>
              <h3 className="text-lg font-semibold text-white mb-2">Random Discovery</h3>
              <p className="text-gray-400 text-sm">Find something unexpected</p>
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
