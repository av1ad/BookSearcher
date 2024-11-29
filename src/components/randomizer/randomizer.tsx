import React, { useState } from "react";
import Header from "../Header";
import Footer from "../Footer";

export default function Randomizer() {

  const [bookCover, setBookCover] = useState(<img></img>)
  const [bookName, setBookName] = useState(<h3></h3>)
  const [authorName, setAuthorName] = useState(<p></p>)


  const fetchBooks = () => fetch('https://openlibrary.org/search.json?q=norwegian+wood')
    .then((res) => res.json())
    .then((books) => {
      console.log(books.docs[0].isbn[1])
      const img = <img src={`https://covers.openlibrary.org/b/isbn/${books.docs[0].isbn[Math.floor(Math.random() * books.docs[0].isbn.length)]}-L.jpg`} alt="Book cover" onError={() => <p>Could not find book cover</p>}></img>
      setBookCover(img)
      setBookName(<h1>{books.docs[0].title}</h1>)
      setAuthorName(<p>by {books.docs[0].author_name}</p>)
    })

  return (
    <>
      <Header />
      <div className="flex flex-col min-h-screen justify-center items-center">
        <h1>Get A Random Book!</h1>
        <li className="w-[12em] h-[70%] m-3 list-none book">{bookCover}</li>
        <div className="h-[5%] m-2">{bookName} {authorName}</div>
        <button
          className="bg-[#758173] text-[#d9d9d9] p-3 rounded w-48 h-[25%] uppercase bold hover:bg-[#3c7a46]"
          onClick={(() => { fetchBooks() })}
        >
          Randomize
        </button>
      </div>
      <Footer />
    </>
  );
}
