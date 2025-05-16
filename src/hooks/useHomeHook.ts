"use client";

import { BookType } from "@/utils/types";
import { useEffect, useState } from "react";

const ITEMS_PER_PAGE = 10;

const useHomeHook = () => {
  const [books, setBooks] = useState<BookType[]>([]);
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
      setBooks((prev) => [...prev, ...data.data]);
      setTotalPages(data.totalPages);
    } catch (err) {
      console.error("Failed to fetch books", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => {
        return prev + 1;
      });
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
    fetchNextPage,
  };
};

export default useHomeHook;
