"use client";

import Footer from "@/app/(components)/Footer";
import Header from "@/app/(components)/Header";
import { usePathname } from "next/navigation";
import { ReactNode, useState } from "react";

export default function GenrePage() {
  const [books, setBooks] = useState<Array<ReactNode>>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const pathname = usePathname();
  const firstSegment = pathname.split("/")[2];

  // Shows a list of books with that genre that is selected, allows you to click on the book and redirects you to the book id
  // We'll also use the search method for these so when they click on a subject/genre it redirects to the genre id
  // Extra feature would being able to search with specific genre




  return (
    <div>
      <Header />
      <div className="content-center justify-items-center my-10">
        <h1 className="capitalize bold text-3xl bg-opacity-25 bg-black p-4 rounded-lg">
          {firstSegment}
        </h1>
      </div>

      <Footer />
    </div>
  );
}
