"use client";

import React, { useState } from "react";
import Header from "@/app/(components)/Header";
import Footer from "@/app/(components)/Footer";
import Image from "next/image";
import { FaSearch } from "react-icons/fa";

export default function Page() {
  // Gets randomly selected books and does a scrolling animation for them
  // Search bar allowing you to search from author, title, isbn, etc.
  const [bookCover, setBookCover] = useState(<img></img>);
  const [isLoading, setIsLoading] = useState(false);

  try {
    fetch("https://openlibrary.org/search.json?q=random&fields=*")
      .then((res) => res.json())
      .then((books) => {
        const randomBook = Math.floor(Math.random() * books.docs.length);
        let src = ``;
        src = `https://covers.openlibrary.org/b/olid/${books.docs[randomBook].cover_edition_key}-L.jpg`;
        const img = (
          <Image
            loader={() => src}
            src={src}
            alt="Book cover"
            width={500}
            height={700}
          />
        );
        setBookCover(img);
        setIsLoading(true);
      });
  } catch {
    console.log("cant fetch books...trying again");
  }
  return (
    <React.Fragment>
      <Header />
      <div className="min-h-screen min-w-screen overflow-hidden">
        <div className="w-[calc(800px*4)] animate-scroll">
          <ul className="grid grid-cols-8 justify-items-center whitespace-nowrap">
            {isLoading ? (
              <li className="w-[50%] h-[100%] m-10">{bookCover}</li>
            ) : (
              <li className="w-[12.75em] h-[21em] m-10 animate-pulse bg-white"></li>
            )}
            {isLoading ? (
              <li className="w-[50%] h-[100%] m-10">{bookCover}</li>
            ) : (
              <li className="w-[12.75em] h-[21em] m-10 animate-pulse bg-white"></li>
            )}
            {isLoading ? (
              <li className="w-[50%] h-[100%] m-10">{bookCover}</li>
            ) : (
              <li className="w-[12.75em] h-[21em] m-10 animate-pulse bg-white"></li>
            )}
            {isLoading ? (
              <li className="w-[50%] h-[100%] m-10">{bookCover}</li>
            ) : (
              <li className="w-[12.75em] h-[21em] m-10 animate-pulse bg-white"></li>
            )}
          </ul>
        </div>
        <div className="flex justify-center text-[#A9C5A0] mt-12">
          <input
            type="text"
            placeholder="Search books by title or author"
            className="w-[65%] bg-[#D9D9D9] bg-opacity-10 p-4 placeholder-gray-400"
          />
          <button className="bg-[#D9D9D9] text-[#000] md:text-2xl sm:text-sm p-5">
            <FaSearch />
          </button>
        </div>
      </div>
      <Footer />
    </React.Fragment>
  );
}
