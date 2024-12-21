"use client";

import { useEffect, useState } from "react";
import Footer from "@/app/(components)/Footer";
import Header from "@/app/(components)/Header";
import { usePathname, useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { FaLess } from "react-icons/fa";

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
        const book = response.docs
        console.log(book)
  
        setIsLoading(false)
  
      };

      displayBooks()

    } catch (error) {
      throw new Error(error)
    } finally {
      setIsLoading(false)
    }
  }, []);

  return (
    <div>
      <Header />
      <div className="min-h-scsreen flex flex-col">
        <div className="text-center m-10">
          <h1>Finding all books with the query: {query}</h1>
        </div>
      </div>
      <Footer />
    </div>
  );
}
