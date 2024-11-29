import React, { useState } from "react";
import Header from "../Header";
import Footer from "../Footer";

export default function Randomizer() {

  const [bookCover, setBookCover] = useState(<img></img>)


  const fetchBooks = () => fetch('https://openlibrary.org/search.json?q=the+lord+of+the+rings')
    .then((res) => res.json())
    .then((books) => {
      console.log(books.docs[0].isbn[1])
      const img = <img src={`https://covers.openlibrary.org/b/isbn/${books.docs[0].isbn[3]}-L.jpg`}></img>
      setBookCover(img)
    })

  return (
    <>
      <Header />
      <div className="flex flex-col min-h-screen justify-center items-center">
        <h1>Get A Random Book!</h1>
        <li className="w-[12em] h-[75%] m-3 list-none book">{bookCover}</li>
        <button
          className="bg-[#758173] text-[#d9d9d9] p-3 rounded w-48 h-[25%] uppercase bold"
          onClick={(() => { fetchBooks() })}
        >
          Randomize
        </button>
      </div>
      <Footer />
    </>
  );
}
