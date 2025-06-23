"use client";

import { useState, useEffect, useCallback } from 'react';

interface GenreBook {
  key: string;
  title: string;
  authors: Array<{ name: string; key: string }>;
  cover_edition_key?: string;
  first_publish_year?: number;
}

interface GenreResult {
  works: GenreBook[];
  work_count: number;
}

export function useGenreBooks(genre: string) {
  const [books, setBooks] = useState<GenreBook[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [totalFound, setTotalFound] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  
  const BOOKS_PER_PAGE = 20;

  const fetchGenreBooks = useCallback(async (genreQuery: string, page: number = 0, append: boolean = false) => {
    if (!genreQuery.trim()) return;

    if (page === 0) {
      setIsLoading(true);
      setBooks([]);
      setCurrentPage(0);
    } else {
      setIsLoadingMore(true);
    }
    
    setError(null);

    try {
      const offset = page * BOOKS_PER_PAGE;
      const url = `https://openlibrary.org/subjects/${encodeURIComponent(genreQuery)}.json?details=true&limit=${BOOKS_PER_PAGE}&offset=${offset}`;
      
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Failed to fetch genre books');
      }
      
      const data: GenreResult = await response.json();
      
      // Filter books that have cover images
      const booksWithCovers = (data.works || []).filter(book => book.cover_edition_key);
      
      if (append) {
        setBooks(prev => [...prev, ...booksWithCovers]);
      } else {
        setBooks(booksWithCovers);
      }
      
      setTotalFound(data.work_count || 0);
      setHasMore(offset + (data.works?.length || 0) < (data.work_count || 0));
      setCurrentPage(page);
      
    } catch (err) {
      setError('Failed to fetch genre books. Please try again.');
      console.error('Genre books error:', err);
    } finally {
      setIsLoading(false);
      setIsLoadingMore(false);
    }
  }, []);

  const loadMore = useCallback(() => {
    if (!isLoadingMore && hasMore && genre) {
      fetchGenreBooks(genre, currentPage + 1, true);
    }
  }, [fetchGenreBooks, isLoadingMore, hasMore, genre, currentPage]);

  const resetBooks = useCallback(() => {
    setBooks([]);
    setCurrentPage(0);
    setHasMore(true);
    setTotalFound(0);
    setError(null);
  }, []);

  useEffect(() => {
    if (genre.trim()) {
      fetchGenreBooks(genre, 0, false);
    } else {
      resetBooks();
    }
  }, [genre, fetchGenreBooks, resetBooks]);

  return {
    books,
    isLoading,
    isLoadingMore,
    error,
    hasMore,
    totalFound,
    loadMore,
    resetBooks
  };
}