"use client";

import { useEffect, useState } from "react";
import Footer from "@/app/(components)/Footer";
import Header from "@/app/(components)/Header";
import { usePathname, useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

export default function SearchPage() {
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<null>(null);

  const searchParams = useSearchParams();
  const query = searchParams.get("q");
  const pathname = usePathname();

  // Fetch the data from the path name
  // Loading card for books
  // Get book title, author, release year
  // Use nextjs Link to link books (Might have to change books path so books can be found using their isbn)

  useEffect(() => {
    try {
      const displayBooks = async () => {
        const data = await fetch(
          `https://openlibrary.org/search.json?q=${query}`
        );
        const response = await data.json();
        const book = response.docs;
        const bookInfo = book.map((books: any) => {
          const author = books.author_name;
          const title = books.title;
          const bookImage = `https://covers.openlibrary.org/b/olid/${books.cover_edition_key}-M.jpg`;

          return (
            <div
              key={books}
              className="flex flex-col justify-items-center align-middle m-5"
            >
              <Image
                key={books.cover_edition_key}
                loader={() => bookImage}
                src={bookImage}
                alt="Book cover"
                width={200}
                height={200}
                quality={60}
              />
              <p>{author}</p>
              <p>{title}</p>
            </div>
          );
        });
        console.log(book);
        setBooks(bookInfo);
        setIsLoading(false);
      };

      displayBooks();
    } catch (error) {
      setError(error)
    } finally {
      setIsLoading(true);
    }
  }, [query]);

  return (
    <div>
      <Header />
      <div className="min-h-scsreen flex flex-col">
        <div className="text-center m-10">
          <h1>Finding all books with the query: {query}</h1>
          {error ? <div className="text-center m-5 text-red-700">{error}</div> : ""}
          <div className="grid grid-cols-6 justify-items-center list-none">
            {isLoading
              ? Array(12)
                  .fill(0)
                  .map((_, index) => (
                    <li
                      key={index}
                      className="w-[12.75em] h-[21em] m-10 animate-pulse bg-white"
                    ></li>
                  ))
              : books.slice(0, 12).map((book, index) => (
                  <Link key={book} href={`/books/${index}`}>
                    {" "}
                    {book}
                  </Link>
                ))}
          </div>
          <button className="focus:outline-none text-white bg-[#3c7a46] hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 my-5 dark:bg-[#3c7a46] dark:hover:bg-green-700 dark:focus:ring-green-800">Load More</button>
        </div>
      </div>
      <Footer />
    </div>
  );
}