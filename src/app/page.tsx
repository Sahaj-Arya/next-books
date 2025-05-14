"use client";
import BookCard from "@/components/BookCard";
import useHomeHook from "@/hooks/useHomeHook";
import { BookType } from "@/utils/types";

export default function HomePage() {
  const { books, loading, setCurrentPage, currentPage, totalPages } =
    useHomeHook();
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
