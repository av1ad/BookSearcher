import Image from "next/image";
import Header from "../(components)/Header";
import Footer from "../(components)/Footer";

export default function Randomizer() {
  // Gets random book when button is clicked, book shows about the same information as the search query

  return (
    <div>
      <Header />
      <h1>Title</h1>
      <Image alt="Book Cover" src="" width={100} height={100}>
        {undefined}
      </Image>
      <p>Author</p>
      <button>Get A Random Book</button>
      <Footer />
    </div>
  );
}
