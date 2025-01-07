'use client';

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Header from "@/app/(components)/Header";
import Footer from "@/app/(components)/Footer";
import { useBooks } from "@/app/hooks/useBooks";

export default function BookPage() {
  const pathname = usePathname();
  const bookId = pathname.split("/")[2];
  const { bookInfo, authorInfo, isLoading, error } = useBooks('book', bookId);

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
              <h1 className="text-4xl font-bold text-[#a9c5a0]">
                {bookInfo.title}
              </h1>
              
              {authorInfo && (
                <Link 
                  href={`/authors/${authorInfo.key.split('/').pop()}`}
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
                    {typeof bookInfo.description === 'string' 
                      ? bookInfo.description 
                      : bookInfo.description.value}
                  </p>
                </div>
              )}
              
              {bookInfo.subjects && (
                <div className="space-y-2">
                  <h2 className="text-xl font-semibold text-[#a9c5a0]">Subjects</h2>
                  <div>
                    {bookInfo.subjects.slice(0, 5).map((subject: string) => (
                      <Link
                        key={subject}
                        href={`/genres/${subject.toLowerCase().replace(/\s+/g, '_')}`}
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
          <div className="text-center text-[#a9c5a0]">
            Book not found
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
