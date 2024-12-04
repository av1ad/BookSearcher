import Header from "../Header";
import Footer from "../Footer";

export default function authors() {

  return (
    <>
      <Header />
      <div className="min-h-screen">
        <div>
          <div className="bg-[#D9D9D9] bg-opacity-10 mt-10 mx-auto h-48 w-48"></div>
            <h1 className="text-2xl p-3 text-white uppercase bold">Author Name</h1>
        </div>
        <div className="books">
          <ul className="grid lg:grid-cols-4 md:grid-cols-4 sm:grid-cols-2 justify-items-center">
            <li className="border-[.5em] w-[12em] h-[19em] m-3"></li>
            <li className="border-[.5em] w-[12em] h-[19em] m-3"></li>
            <li className="border-[.5em] w-[12em] h-[19em] m-3"></li>
            <li className="border-[.5em] w-[12em] h-[19em] m-3"></li>
            <li className="border-[.5em] w-[12em] h-[19em] m-3"></li>
            <li className="border-[.5em] w-[12em] h-[19em] m-3"></li>
            <li className="border-[.5em] w-[12em] h-[19em] m-3"></li>
            <li className="border-[.5em] w-[12em] h-[19em] m-3"></li>
          </ul>
        </div>
      </div>
      <Footer />
    </>
  );
}
