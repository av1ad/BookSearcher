"use client";

import { useAuth } from '@/contexts/AuthContext'
import { useFavorites } from '@/app/hooks/useFavorites'
import Header from '@/app/(components)/Header'
import Footer from '@/app/(components)/Footer'
import Image from 'next/image'
import Link from 'next/link'
import { FaTrash } from 'react-icons/fa'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function Favorites() {
  const { user, isLoading: authLoading } = useAuth()
  const { favorites, isLoading, removeFavorite } = useFavorites()
  const router = useRouter()

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login')
    }
  }, [user, authLoading, router])

  const handleRemoveFavorite = async (bookId: string) => {
    try {
      await removeFavorite(bookId)
    } catch (error: any) {
      alert(error.message)
    }
  }

  if (authLoading || !user) {
    return (
      <div>
        <Header />
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin h-8 w-8 border-2 border-[#a9c5a0] border-t-transparent rounded-full" />
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div>
      <Header />
      <div className="min-h-screen max-w-6xl mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-[#a9c5a0] mb-4">
            My Favorite Books
          </h1>
          <p className="text-[#758173]">
            Your personally curated book collection
          </p>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-16">
            <div className="animate-spin h-8 w-8 border-2 border-[#a9c5a0] border-t-transparent rounded-full" />
          </div>
        ) : favorites.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-xl text-[#758173] mb-6">
              You haven&apos;t added any favorite books yet
            </p>
            <Link
              href="/"
              className="bg-[#3c7a46] text-white py-3 px-6 rounded-lg hover:bg-[#2c5a34] transition-colors"
            >
              Discover Books
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {favorites.map((favorite) => (
              <div
                key={favorite.id}
                className="bg-[#D9D9D9] bg-opacity-5 p-6 rounded-lg relative group"
              >
                <button
                  onClick={() => handleRemoveFavorite(favorite.bookId)}
                  className="absolute top-4 right-4 text-red-500 hover:text-red-700 opacity-0 group-hover:opacity-100 transition-opacity"
                  title="Remove from favorites"
                >
                  <FaTrash size={16} />
                </button>
                
                <Link href={`/books/${favorite.bookId}`}>
                  <div className="flex flex-col items-center text-center">
                    {favorite.bookCover ? (
                      <Image
                        src={favorite.bookCover}
                        alt={favorite.bookTitle}
                        width={150}
                        height={200}
                        className="rounded-lg shadow-lg mb-4 hover:scale-105 transition-transform"
                      />
                    ) : (
                      <div className="w-[150px] h-[200px] bg-[#D9D9D9] bg-opacity-20 rounded-lg flex items-center justify-center mb-4">
                        <span className="text-[#758173] text-sm">No cover</span>
                      </div>
                    )}
                    
                    <h3 className="text-lg font-semibold text-[#a9c5a0] mb-2 line-clamp-2">
                      {favorite.bookTitle}
                    </h3>
                    
                    {favorite.bookAuthor && (
                      <p className="text-[#758173] text-sm">
                        by {favorite.bookAuthor}
                      </p>
                    )}
                    
                    <p className="text-xs text-[#758173] mt-2">
                      Added {new Date(favorite.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </div>
  )
}