"use client";

import { useState, useEffect, useCallback } from 'react'
import { useAuth } from '@/contexts/AuthContext'

interface Favorite {
  id: string
  bookId: string
  bookTitle: string
  bookAuthor?: string
  bookCover?: string
  createdAt: string
}

export function useFavorites() {
  const [favorites, setFavorites] = useState<Favorite[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const { token } = useAuth()

  const fetchFavorites = useCallback(async () => {
    if (!token) return

    setIsLoading(true)
    try {
      const response = await fetch('/api/favorites', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      if (response.ok) {
        const data = await response.json()
        setFavorites(data.favorites)
      }
    } catch (error) {
      console.error('Error fetching favorites:', error)
    } finally {
      setIsLoading(false)
    }
  }, [token])

  const addFavorite = async (bookId: string, bookTitle: string, bookAuthor?: string, bookCover?: string) => {
    if (!token) throw new Error('Not authenticated')

    const response = await fetch('/api/favorites', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ bookId, bookTitle, bookAuthor, bookCover })
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.error || 'Failed to add favorite')
    }

    const data = await response.json()
    setFavorites(prev => [data.favorite, ...prev])
    return data.favorite
  }

  const removeFavorite = async (bookId: string) => {
    if (!token) throw new Error('Not authenticated')

    const response = await fetch(`/api/favorites?bookId=${bookId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.error || 'Failed to remove favorite')
    }

    setFavorites(prev => prev.filter(fav => fav.bookId !== bookId))
  }

  const isFavorite = (bookId: string) => {
    return favorites.some(fav => fav.bookId === bookId)
  }

  useEffect(() => {
    fetchFavorites()
  }, [token, fetchFavorites])

  return {
    favorites,
    isLoading,
    addFavorite,
    removeFavorite,
    isFavorite,
    refetch: fetchFavorites
  }
}