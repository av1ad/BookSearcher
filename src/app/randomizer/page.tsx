"use client"

import Image from "next/image";
import Header from "../(components)/Header";
import Footer from "../(components)/Footer";
import { useState } from "react";

export default function Randomizer() {
  // Gets random book when button is clicked, book shows about the same information as the search query

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
    <div>
      <Header />
      <h1>Title</h1>
      {isLoading ? bookCover : <li className="w-[12.75em] h-[21em] m-10 animate-pulse bg-white"></li>}
      <p>Author</p>
      <button>Get A Random Book</button>
      <Footer />
    </div>
  );
}
