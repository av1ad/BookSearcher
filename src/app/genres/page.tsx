'use client';

import Link from "next/link";
import Footer from "../(components)/Footer";
import Header from "../(components)/Header";

const genres = [
  {
    category: "Fiction",
    color: "bg-red-500",
    items: [
      { name: "Fiction", slug: "fiction" },
      { name: "Fantasy", slug: "fantasy" },
      { name: "Science Fiction", slug: "science_fiction" },
      { name: "Horror", slug: "horror" },
      { name: "Young Adult", slug: "young_adult" }
    ]
  },
  {
    category: "Non-Fiction",
    color: "bg-green-500",
    items: [
      { name: "Nonfiction", slug: "nonfiction" },
      { name: "Autobiographies", slug: "autobiography" },
      { name: "Psychology", slug: "psychology" }
    ]
  },
  {
    category: "Academic",
    color: "bg-blue-500",
    items: [
      { name: "History", slug: "history" },
      { name: "Mathematics", slug: "mathematics" },
      { name: "Science", slug: "science" },
      { name: "Geography", slug: "geography" }
    ]
  }
];

export default function GenreList() {
  return (
    <div>
      <Header />
      <div className="min-h-screen max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center text-[#a9c5a0] mb-12">
          Browse Books by Genre
        </h1>
        <div className="grid md:grid-cols-3 gap-8">
          {genres.map((category) => (
            <div 
              key={category.category} 
              className={`${category.color} rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow`}
            >
              <h2 className="text-xl font-bold mb-4 text-white">
                {category.category}
              </h2>
              <ul className="space-y-3">
                {category.items.map((genre) => (
                  <li key={genre.slug}>
                    <Link 
                      href={`/genres/${genre.slug}`}
                      className="text-white hover:text-black transition-colors flex items-center group"
                    >
                      <span className="transform group-hover:translate-x-2 transition-transform">
                        {genre.name}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}
