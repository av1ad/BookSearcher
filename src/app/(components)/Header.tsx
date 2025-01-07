"use client";

import { useState } from "react";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { FaGithub } from "react-icons/fa";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Logo from "../../../public/logosvg.svg";

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
    { id: 3, text: "Randomizer", link: "/randomizer", target: "_self" },
    { id: 4, text: "AI", link: "/ai", target: "_self" },
    {
      id: 5,
      text: <FaGithub size={25} />,
      link: "https://github.com/av1ad",
      target: "_blank",
    },
  ];

  const pathname = usePathname();

  return (
    <div className="bg-[#758173] flex justify-between items-center h-24 max-w-full mx-auto px-8 text-white">
      {/* Logo */}
      <h1 className="w-[75%] text-3xl font-bold text-[#FFFFFF] text-left flex justify-items-center align-middle">
        <Link href={"/"}>BookSearcher{" "}</Link>
        <Image
          alt="BookSearcher Logo"
          src={Logo}
          width={45}
          className="ml-3"
        ></Image>
      </h1>

      {/* Desktop Navigation */}
      <ul className="hidden md:flex">
        {navItems.map((item) => (
          <li
            key={item.id}
            className="p-4 rounded-xl m-2 cursor-pointer duration-300 hover:text-[#A9C5A0]"
          >
            <Link
              href={item.link}
              className={pathname == item.link ? "text-[#A9C5A0]" : "text-blue"}
              target={item.target}
            >
              {item.text}
            </Link>
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
            ? "fixed md:hidden left-0 top-0 w-[60%] h-full border-r border-r-gray-900 bg-[#758173] ease-in-out duration-500 z-10"
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
            className="p-4 border-b hover:bg-[#A9C5A0] duration-300 hover:text-[#A9C5A0] cursor-pointer border-gray-600 text-center"
          >
            <Link
              href={item.link}
              className={pathname == item.link ? "text-[#A9C5A0]" : "text-blue"}
              target={item.target}
            >
              {item.text}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Header;
