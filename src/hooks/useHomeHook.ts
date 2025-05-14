"use client";

import { useEffect, useState } from "react";

const ITEMS_PER_PAGE = 6;

const useHomeHook = () => {
  const [books, setBooks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  const fetchBooks = async (page: number) => {
    setLoading(true);
    try {
      const res = await fetch(
        `/api/books?page=${page}&limit=${ITEMS_PER_PAGE}`
      );
      const data = await res.json();
      setBooks(data.data);
      setTotalPages(data.totalPages);
    } catch (err) {
      console.error("Failed to fetch books", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks(currentPage);
  }, [currentPage]);

  return {
    books,
    loading,
    setCurrentPage,
    currentPage,
    totalPages,
  };
};

export default useHomeHook;
