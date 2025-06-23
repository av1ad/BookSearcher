"use client";

import { useState, useEffect, useCallback } from 'react';

interface AuthorBook {
  key: string;
  title: string;
  covers?: number[];
  first_publish_year?: number;
}

interface AuthorInfo {
  name: string;
  birth_date?: string;
  death_date?: string;
  bio?: string | { value: string };
}

interface AuthorWorksResult {
  entries: AuthorBook[];
  size: number;
}

export function useAuthorBooks(authorId: string) {
  const [books, setBooks] = useState<AuthorBook[]>([]);
  const [authorInfo, setAuthorInfo] = useState<AuthorInfo | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [totalFound, setTotalFound] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  
  const BOOKS_PER_PAGE = 20;

  const fetchAuthorInfo = useCallback(async (authorQuery: string) => {
    try {
      const url = `https://openlibrary.org/authors/${authorQuery}.json`;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Failed to fetch author info');
      }
      const data = await response.json();
      setAuthorInfo(data);
    } catch (err) {
      console.error('Author info error:', err);
    }
  }, []);

  const fetchAuthorBooks = useCallback(async (authorQuery: string, page: number = 0, append: boolean = false) => {
    if (!authorQuery.trim()) return;

    if (page === 0) {
      setIsLoading(true);
      setBooks([]);
      setCurrentPage(0);
      // Fetch author info on first load
      fetchAuthorInfo(authorQuery);
    } else {
      setIsLoadingMore(true);
    }
    
    setError(null);

    try {
      const offset = page * BOOKS_PER_PAGE;
      const url = `https://openlibrary.org/authors/${authorQuery}/works.json?limit=${BOOKS_PER_PAGE}&offset=${offset}`;
      
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Failed to fetch author books');
      }
      
      const data: AuthorWorksResult = await response.json();
      
      // Filter books that have covers
      const booksWithCovers = (data.entries || []).filter(book => book.covers && book.covers.length > 0);
      
      if (append) {
        setBooks(prev => [...prev, ...booksWithCovers]);
      } else {
        setBooks(booksWithCovers);
      }
      
      setTotalFound(data.size || 0);
      setHasMore(offset + (data.entries?.length || 0) < (data.size || 0));
      setCurrentPage(page);
      
    } catch (err) {
      setError('Failed to fetch author books. Please try again.');
      console.error('Author books error:', err);
    } finally {
      setIsLoading(false);
      setIsLoadingMore(false);
    }
  }, [fetchAuthorInfo]);

  const loadMore = useCallback(() => {
    if (!isLoadingMore && hasMore && authorId) {
      fetchAuthorBooks(authorId, currentPage + 1, true);
    }
  }, [fetchAuthorBooks, isLoadingMore, hasMore, authorId, currentPage]);

  const resetBooks = useCallback(() => {
    setBooks([]);
    setAuthorInfo(null);
    setCurrentPage(0);
    setHasMore(true);
    setTotalFound(0);
    setError(null);
  }, []);

  useEffect(() => {
    if (authorId.trim()) {
      fetchAuthorBooks(authorId, 0, false);
    } else {
      resetBooks();
    }
  }, [authorId, fetchAuthorBooks, resetBooks]);

  return {
    books,
    authorInfo,
    isLoading,
    isLoadingMore,
    error,
    hasMore,
    totalFound,
    loadMore,
    resetBooks
  };
}