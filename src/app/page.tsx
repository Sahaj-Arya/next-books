"use client";

import { useEffect, useState } from "react";
import BookCard from "@/components/BookCard";
import { BookType } from "@/utils/types";

const ITEMS_PER_PAGE = 6;

export default function HomePage() {
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

  return (
    <main className="p-6 md:p-10">
      <h1 className="text-3xl font-bold mb-6 text-center">📚 BookStore</h1>

      {loading ? (
        <p className="text-center">Loading books...</p>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-10">
            {books?.map((book: BookType) => (
              <BookCard key={book.image} book={book} />
            ))}
          </div>

          {/* Pagination Controls */}
          <div className="flex justify-center items-center gap-4">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-gray-200 rounded text-black disabled:opacity-50 hover:bg-gray-300 transition"
            >
              ⬅️ Previous
            </button>

            <span className="font-medium text-gray-800">
              Page <strong>{currentPage}</strong> of{" "}
              <strong>{totalPages}</strong>
            </span>

            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-gray-200 rounded text-black disabled:opacity-50 hover:bg-gray-300 transition"
            >
              Next ➡️
            </button>
          </div>
        </>
      )}
    </main>
  );
}
