"use client";

import { useState } from "react";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { FaGithub, FaUser, FaHeart } from "react-icons/fa";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { useAuth } from "@/contexts/AuthContext";
import Logo from "../../../public/logosvg.svg";

const Header = () => {
  const [nav, setNav] = useState(false);
  const [userDropdown, setUserDropdown] = useState(false);
  const { user, logout } = useAuth();

  const handleNav = () => {
    setNav(!nav);
  };

  const handleLogout = () => {
    logout();
    setUserDropdown(false);
  };

  const navItems = [
    { id: 1, text: "Home", link: "/", target: "_self" },
    { id: 2, text: "Genres", link: "/genres", target: "_self" },
    { id: 3, text: "Randomizer", link: "/randomizer", target: "_self" },
    { id: 4, text: "AI", link: "/ai", target: "_self" },
    ...(user ? [{ id: 5, text: <FaHeart size={20} />, link: "/favorites", target: "_self" }] : []),
    {
      id: 6,
      text: <FaGithub size={25} />,
      link: "https://github.com/av1ad",
      target: "_blank",
    },
  ];

  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 glass-effect border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <Link href="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
              <Image
                alt="BookSearcher Logo"
                src={Logo}
                width={40}
                height={40}
                className="rounded-lg"
              />
              <h1 className="text-2xl font-bold text-white">BookSearcher</h1>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            <nav className="flex items-center space-x-1">
              {navItems.map((item) => (
                <Link
                  key={item.id}
                  href={item.link}
                  target={item.target}
                  className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                    pathname === item.link
                      ? 'text-[#a9c5a0] bg-[#a9c5a0] bg-opacity-10'
                      : 'text-gray-300 hover:text-white hover:bg-white hover:bg-opacity-10'
                  }`}
                >
                  {item.text}
                </Link>
              ))}
            </nav>
            
            {/* User Authentication */}
            {user ? (
              <div className="relative ml-6">
                <button
                  onClick={() => setUserDropdown(!userDropdown)}
                  className="flex items-center space-x-2 px-3 py-2 rounded-lg bg-[#a9c5a0] bg-opacity-10 hover:bg-opacity-20 transition-colors text-white"
                >
                  <FaUser size={16} />
                  <span className="text-sm font-medium">
                    {user.name || user.email.split('@')[0]}
                  </span>
                </button>
                
                {userDropdown && (
                  <div className="absolute right-0 mt-2 w-48 glass-effect rounded-lg shadow-xl py-2 z-50 border border-gray-700">
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-gray-300 hover:text-white hover:bg-white hover:bg-opacity-10 transition-colors"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="ml-6 flex items-center space-x-3">
                <Link
                  href="/login"
                  className="px-4 py-2 text-sm font-medium text-gray-300 hover:text-white transition-colors"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="px-4 py-2 text-sm font-medium bg-[#a9c5a0] text-white rounded-lg hover:bg-[#8fb389] transition-colors"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Navigation Icon */}
          <div className="md:hidden">
            <button
              onClick={handleNav}
              className="p-2 rounded-lg text-gray-300 hover:text-white hover:bg-white hover:bg-opacity-10 transition-colors"
            >
              {nav ? <AiOutlineClose size={24} /> : <AiOutlineMenu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <div
        className={`md:hidden fixed inset-0 z-40 transition-opacity duration-300 ${
          nav ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div 
          className="absolute inset-0 bg-black bg-opacity-50"
          onClick={() => setNav(false)}
        />
        <div
          className={`absolute left-0 top-0 h-full w-80 max-w-[80vw] glass-effect border-r border-gray-700 transform transition-transform duration-300 ${
            nav ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <div className="p-6">
            <div className="flex items-center space-x-3 mb-8">
              <Image
                alt="BookSearcher Logo"
                src={Logo}
                width={32}
                height={32}
                className="rounded-lg"
              />
              <h1 className="text-xl font-bold text-white">BookSearcher</h1>
            </div>

            <nav className="space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.id}
                  href={item.link}
                  target={item.target}
                  onClick={() => setNav(false)}
                  className={`block px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                    pathname === item.link
                      ? 'text-[#a9c5a0] bg-[#a9c5a0] bg-opacity-10'
                      : 'text-gray-300 hover:text-white hover:bg-white hover:bg-opacity-10'
                  }`}
                >
                  {item.text}
                </Link>
              ))}
            </nav>

            {user ? (
              <div className="mt-8 pt-6 border-t border-gray-700">
                <div className="px-4 py-2 text-sm text-gray-400">
                  Signed in as
                </div>
                <div className="px-4 py-2 text-white font-medium">
                  {user.name || user.email}
                </div>
                <button
                  onClick={() => {
                    handleLogout()
                    setNav(false)
                  }}
                  className="w-full mt-2 px-4 py-2 text-left text-gray-300 hover:text-white hover:bg-white hover:bg-opacity-10 rounded-lg transition-colors"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="mt-8 pt-6 border-t border-gray-700 space-y-3">
                <Link
                  href="/login"
                  onClick={() => setNav(false)}
                  className="block w-full px-4 py-2 text-center text-gray-300 hover:text-white hover:bg-white hover:bg-opacity-10 rounded-lg transition-colors"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  onClick={() => setNav(false)}
                  className="block w-full px-4 py-2 text-center bg-[#a9c5a0] text-white rounded-lg hover:bg-[#8fb389] transition-colors"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
