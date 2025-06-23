"use client";

import { useState, useEffect, useCallback } from 'react';

interface Book {
  key: string;
  title: string;
  author_name?: string[];
  cover_edition_key?: string;
  first_publish_year?: number;
  publisher?: string[];
  isbn?: string[];
}

interface SearchResult {
  docs: Book[];
  numFound: number;
  start: number;
  numFoundExact: boolean;
}

export function useSearchBooks(query: string) {
  const [books, setBooks] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [totalFound, setTotalFound] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  
  const BOOKS_PER_PAGE = 20;

  const searchBooks = useCallback(async (searchQuery: string, page: number = 0, append: boolean = false) => {
    if (!searchQuery.trim()) return;

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
      const url = `https://openlibrary.org/search.json?q=${encodeURIComponent(searchQuery)}&fields=key,title,author_name,cover_edition_key,first_publish_year,publisher,isbn&limit=${BOOKS_PER_PAGE}&offset=${offset}`;
      
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Failed to fetch search results');
      }
      
      const data: SearchResult = await response.json();
      
      // Filter books that have cover images
      const booksWithCovers = data.docs.filter(book => book.cover_edition_key);
      
      if (append) {
        setBooks(prev => [...prev, ...booksWithCovers]);
      } else {
        setBooks(booksWithCovers);
      }
      
      setTotalFound(data.numFound);
      setHasMore(data.start + data.docs.length < data.numFound);
      setCurrentPage(page);
      
    } catch (err) {
      setError('Failed to fetch search results. Please try again.');
      console.error('Search error:', err);
    } finally {
      setIsLoading(false);
      setIsLoadingMore(false);
    }
  }, []);

  const loadMore = useCallback(() => {
    if (!isLoadingMore && hasMore && query) {
      searchBooks(query, currentPage + 1, true);
    }
  }, [searchBooks, isLoadingMore, hasMore, query, currentPage]);

  const resetSearch = useCallback(() => {
    setBooks([]);
    setCurrentPage(0);
    setHasMore(true);
    setTotalFound(0);
    setError(null);
  }, []);

  useEffect(() => {
    if (query.trim()) {
      searchBooks(query, 0, false);
    } else {
      resetSearch();
    }
  }, [query, searchBooks, resetSearch]);

  return {
    books,
    isLoading,
    isLoadingMore,
    error,
    hasMore,
    totalFound,
    loadMore,
    resetSearch
  };
}