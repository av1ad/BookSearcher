"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import Header from "@/app/(components)/Header";
import Footer from "@/app/(components)/Footer";
import { useBooks } from "@/app/hooks/useBooks";
import { useAuth } from "@/contexts/AuthContext";
import { useFavorites } from "@/app/hooks/useFavorites";

export default function BookPage() {
  const pathname = usePathname();
  const bookId = pathname.split("/")[2];
  const { bookInfo, authorInfo, isLoading, error } = useBooks("book", bookId);
  const { user } = useAuth();
  const { addFavorite, removeFavorite, isFavorite } = useFavorites();
  const [favoriteLoading, setFavoriteLoading] = useState(false);

  const handleFavoriteToggle = async () => {
    if (!user || !bookInfo) return;
    
    setFavoriteLoading(true);
    try {
      const bookCover = bookInfo.cover_id 
        ? `https://covers.openlibrary.org/b/id/${bookInfo.cover_id}-L.jpg`
        : undefined;

      if (isFavorite(bookId)) {
        await removeFavorite(bookId);
      } else {
        await addFavorite(
          bookId,
          bookInfo.title,
          authorInfo?.name,
          bookCover
        );
      }
    } catch (error: any) {
      alert(error.message);
    } finally {
      setFavoriteLoading(false);
    }
  };

  return (
    <div>
      <Header />
      <div className="max-w-6xl mx-auto px-4 py-8">
        {error ? (
          <div className="text-red-500 text-center">{error}</div>
        ) : isLoading ? (
          <div className="animate-pulse space-y-8">
            <div className="h-96 bg-white/10 rounded-lg" />
            <div className="h-8 bg-white/10 rounded w-1/2" />
            <div className="h-4 bg-white/10 rounded w-1/4" />
          </div>
        ) : bookInfo ? (
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              {bookInfo.cover_id ? (
                <Image
                  src={`https://covers.openlibrary.org/b/id/${bookInfo.cover_id}-L.jpg`}
                  alt={bookInfo.title}
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
              <div className="flex items-start justify-between">
                <h1 className="text-4xl font-bold text-[#a9c5a0] flex-1">
                  {bookInfo.title}
                </h1>
                
                {user && (
                  <button
                    onClick={handleFavoriteToggle}
                    disabled={favoriteLoading}
                    className={`ml-4 p-3 rounded-full transition-colors ${
                      isFavorite(bookId)
                        ? 'text-red-500 hover:text-red-600'
                        : 'text-gray-400 hover:text-red-500'
                    } disabled:opacity-50`}
                    title={isFavorite(bookId) ? 'Remove from favorites' : 'Add to favorites'}
                  >
                    {favoriteLoading ? (
                      <div className="animate-spin h-6 w-6 border-2 border-current border-t-transparent rounded-full" />
                    ) : isFavorite(bookId) ? (
                      <FaHeart size={24} />
                    ) : (
                      <FaRegHeart size={24} />
                    )}
                  </button>
                )}
              </div>

              {authorInfo && (
                <Link
                  href={`/authors/${authorInfo.key.split("/").pop()}`}
                  className="text-xl text-[#758173] hover:text-[#a9c5a0] transition-colors"
                >
                  By: {authorInfo.name}
                </Link>
              )}

              {bookInfo.publishDate && (
                <p className="text-[#758173]">
                  Published: {bookInfo.publishDate}
                  {bookInfo.publisher && ` by ${bookInfo.publisher}`}
                </p>
              )}

              {bookInfo.description && (
                <div className="prose text-[#758173]">
                  <h2 className="text-2xl font-semibold text-[#a9c5a0] mb-2">
                    Description
                  </h2>
                  <p>
                    {typeof bookInfo.description === "string"
                      ? bookInfo.description
                      : bookInfo.description.value}
                  </p>
                </div>
              )}

              {bookInfo.subjects && (
                <div className="space-y-2">
                  <h2 className="text-xl font-semibold text-[#a9c5a0]">
                    Subjects
                  </h2>
                  <div>
                    {bookInfo.subjects.slice(0, 5).map((subject: string) => (
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
                  href={`https://openlibrary.org${bookInfo.key}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#a9c5a0] hover:text-[#758173] transition-colors"
                >
                  View on OpenLibrary →
                </a>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center text-[#a9c5a0]">Book not found</div>
        )}
      </div>
      <Footer />
    </div>
  );
}
