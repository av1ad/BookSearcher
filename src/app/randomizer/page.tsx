"use client";

import Image from "next/image";
import Header from "../(components)/Header";
import Footer from "../(components)/Footer";
import { useState } from "react";

export default function Randomizer() {
  // Gets random book when button is clicked, book shows about the same information as the search query

  const [bookCover, setBookCover] = useState<React.JSX.Element | undefined>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [title, setTitle] = useState<string>("")
  const [author, setAuthor] = useState<string>("")
  const [isDisabled, setIsDisabled] = useState<boolean>(false)

  async function randomBook() {
    try {
      setIsLoading(true);
      await fetch("https://openlibrary.org/search.json?q=random&fields=*")
        .then((res) => res.json())
        .then((books) => {
          const randomBook = Math.floor(Math.random() * books.docs.length);
          const src = `https://covers.openlibrary.org/b/olid/${books.docs[randomBook].cover_edition_key}-L.jpg`;
          const img = (
            <Image
              loader={() => src}
              src={src}
              alt="Book cover"
              width={200}
              height={400}
              className="m-10"
            />
          );
          setBookCover(img);
          setTitle(books.docs[randomBook].title)
          setAuthor(books.docs[randomBook].author_name[0])
        });
    } catch {
      console.log("Cannot fetch books...trying again");
    } finally {
      setIsLoading(false);
    }
  }
  return (

    // Make this into a card with bg, etc.
    <div>
      <Header />
      <div className="min-h-screen content-center justify-items-center justify-center">
        <h1>{isLoading ? "" : title}</h1>
        {isLoading ? (
          <li className="w-[12.75em] h-[21em] m-10 animate-pulse list-none bg-white"></li>
        ) : (
          bookCover
        )}
        <p>{isLoading ? "" : author}</p>
        {isLoading ? <button disabled={isDisabled} className="focus:outline-none text-white bg-[#3c7a46] hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 my-5 dark:bg-[#3c7a46] dark:hover:bg-green-700 dark:focus:ring-green-800" onClick={() => setIsDisabled(true)}>
          Generating....
        </button> : <button className="focus:outline-none text-white bg-[#3c7a46] hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 my-5 dark:bg-[#3c7a46] dark:hover:bg-green-700 dark:focus:ring-green-800" onClick={() => randomBook()}>
          Get Random Book
        </button>}
        
      </div>
      <Footer />
    </div>
  );
}
