"use client";

import Image from "next/image";
import Header from "../(components)/Header";
import Footer from "../(components)/Footer";
import { useState } from "react";

export default function Randomizer() {
  // Gets random book when button is clicked, book shows about the same information as the search query

  const [bookCover, setBookCover] = useState(<img></img>);
  const [isLoading, setIsLoading] = useState(false);

  async function randomBook() {
    try {
      setIsLoading(true);
      await fetch("https://openlibrary.org/search.json?q=random&fields=*")
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
              width={200}
              height={400}
            />
          );
          setBookCover(img);
        });
    } catch {
      console.log("cant fetch books...trying again");
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <div>
      <Header />
      <div className="min-h-screen content-center justify-items-center">
        <h1>Title</h1>
        {isLoading ? (
          <li className="w-[12.75em] h-[21em] m-10 animate-pulse list-none bg-white"></li>
        ) : (
          bookCover
        )}
        <p>Author</p>
        <button onClick={() => randomBook()}>
          {isLoading ? "Generating...." : "Get a random book"}
        </button>
      </div>
      <Footer />
    </div>
  );
}
