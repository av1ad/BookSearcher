import Link from "next/link";
import Footer from "../(components)/Footer";
import Header from "../(components)/Header";

export default function GenreList() {
  // 12 Categories, shows a list of genres where user is able to click on it and brings them to a page with books of that genre

  return (
    <div>
      <Header />
      <div className="min-h-screen min-w-screen overflow-hidden">
        <div className="grid mx-auto items-center overflow-hidden">
          <div className="bg-red-500 m-10">
            <ul>
              <li>Fiction</li>
              <li>Fantasy</li>
              <li>Science Fiction</li>
              <li>Horror</li>
              <li>Young Adult</li>
            </ul>
          </div>
          <div className="bg-green-500 m-10">
            <ul>
              <li>Nonfiction</li>
              <li>Autobiographies</li>
              <li>Psychology</li>
            </ul>
          </div>
          <div className="bg-blue-500 m-10 py-12">
            <ul>
              <li>History</li>
              <li>Mathematics</li>
              <li>Science</li>
              <li>Geography</li>
            </ul>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
