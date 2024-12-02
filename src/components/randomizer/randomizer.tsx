import React, { useState } from "react";
import Header from "../Header";
import Footer from "../Footer";

export default function Randomizer() {
  const [bookCover, setBookCover] = useState(<img></img>);
  const [bookName, setBookName] = useState(<h3></h3>);
  const [authorName, setAuthorName] = useState(<p></p>);

  const fetchBooks = () => {
    try {
      fetch("https://openlibrary.org/search.json?q=random&fields=*", {
        headers: {
          Accept: "application/json",
        },
      })
        .then((res) => res.json())
        .then((books) => {
          console.log(books)
          const img = (
            <img
              src={`https://covers.openlibrary.org/b/isbn/${
                books.docs[0].isbn[
                  Math.floor(Math.random() * books.docs[0].isbn.length)
                ]
              }-M.jpg`}
              alt="Book cover"
              onError={() => <p>Could not find book cover</p>}
            ></img>
          );
          books.docs[0].isbn === undefined ? "Could not find an image for this book" : setBookCover(img)
          setBookName(<h1>{books.docs[0].title}</h1>);
          setAuthorName(<p>by {books.docs[0].author_name}</p>);
        });
    } catch (error) {
      console.log("Couldnt find book with this word..trying again", error);
    }
  };
  return (
    <>
      <Header />
      <div className="flex flex-col min-h-screen align-middle justify-center items-center">
        <h1>Get A Random Book!</h1>
        <li className="w-[12em] h-[100%] m-3 list-none">{bookCover}</li>
        <div className="h-[5%] my-4">
          {bookName} {authorName}
        </div>
        <button
          className="bg-[#758173] text-[#d9d9d9] p-3 rounded w-48 h-[25%] uppercase bold hover:bg-[#3c7a46]"
          onClick={() => {
            fetchBooks();
          }}
        >
          Randomize
        </button>
      </div>
      <Footer />
    </>
  );
}
