import { useState } from "react";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { FaGithub } from "react-icons/fa";
import Link from "next/link";
import Router from "next/router";

const Header = () => {
  // State to manage the Header's visibility
  const [nav, setNav] = useState(false);

  // Toggle function to handle the Header's display
  const handleNav = () => {
    setNav(!nav);
  };

  // Array containing navigation items
  const navItems = [
    { id: 1, text: "Home", link: "/", target: "_self" },
    { id: 2, text: "Genres", link: "/genres", target: "_self" },
    { id: 3, text: "Authors", link: "/authors", target: "_self" },
    { id: 4, text: "Randomizer", link: "/randomizer", target: "_self" },
    { id: 5, text: "AI", link: "/ai", target: "_self" },
    {
      id: 6,
      text: <FaGithub size={25} />,
      link: "https://github.com/av1ad",
      target: "_blank",
    },
  ];
  return (
    <div className="bg-[#758173] flex justify-between items-center h-24 max-w-full mx-auto px-8 text-white">
      {/* Logo */}
      <h1 className="w-[75%] text-3xl font-bold text-[#FFFFFF] text-left">
        BookSearcher{" "}
      </h1>

      {/* Desktop Navigation */}
      <ul className="hidden md:flex">
        {navItems.map((item) => (
          <li
            key={item.id}
            className="p-4 rounded-xl m-2 cursor-pointer duration-300 hover:text-black"
          >
            {/* <NavLink
              to={item.link}
              className={({ isActive }) => (isActive ? "active" : "")}
              target={item.target}
            >
              {item.text}
            </NavLink> */}
          </li>
        ))}
      </ul>

      {/* Mobile Navigation Icon */}
      <div onClick={handleNav} className="block md:hidden">
        {nav ? <AiOutlineClose size={25} /> : <AiOutlineMenu size={25} />}
      </div>

      {/* Mobile Navigation Menu */}
      <ul
        className={
          nav
            ? "fixed md:hidden left-0 top-0 w-[60%] h-full border-r border-r-gray-900 bg-[#758173] ease-in-out duration-500"
            : "ease-in-out w-[60%] duration-500 fixed top-0 bottom-0 left-[-100%]"
        }
      >
        {/* Mobile Logo */}
        <h1 className="w-[90%] text-3xl font-bold text-[#FFFFFF] m-4">
          BookSearcher
        </h1>

        {/* Mobile Navigation Items */}
        {navItems.map((item) => (
          <li
            key={item.id}
            className="p-4 border-b rounded-xl hover:bg-[#A9C5A0] duration-300 hover:text-black cursor-pointer border-gray-600"
          >
            {/* <NavLink
              to={item.link}
              className={({ isActive }) => (isActive ? "active" : "")}
              target={item.target}
            >
              {item.text}
            </NavLink> */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Header;
