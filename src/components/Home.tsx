import { useState } from "react";
import { FaSearch } from "react-icons/fa";

export default function Home() {
  const [bookCover, setBookCover] = useState(<img></img>);

  try {
    fetch("https://openlibrary.org/search.json?q=random&fields=*")
      .then((res) => res.json())
      .then((books) => {
        for (let i = 0; i < 4; i++) {
          const randomBook = Math.floor(Math.random() * books.docs.length);
          console.log(randomBook);
          const img = (
            <img
              src={`https://covers.openlibrary.org/b/olid/${books.docs[randomBook].cover_edition_key}-L.jpg`}
              alt="Book cover"
            ></img>
          );
          setBookCover(img);
        }
      });
  } catch {
    console.log("cant fetch books...trying again");
  }

  return (
    <div className="min-h-screen">
      <div>
        <ul className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 justify-items-center">
          <li className="border-[.5em] w-[12.75em] h-[21em] m-10">
            {bookCover}
          </li>
          <li className="border-[.5em] w-[12.75em] h-[21em] m-10">
            {bookCover}
          </li>
          <li className="border-[.5em] w-[12.75em] h-[21em] m-10">
            {bookCover}
          </li>
          <li className="border-[.5em] w-[12.75em] h-[21em] m-10">
            {bookCover}
          </li>
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
  );
}
