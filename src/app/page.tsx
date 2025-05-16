"use client";
import BookCard from "@/components/BookCard";
import useHomeHook from "@/hooks/useHomeHook";
import { BookType } from "@/utils/types";
import InfiniteScroll from "react-infinite-scroll-component";

export default function HomePage() {
  const { books, loading, currentPage, totalPages, fetchNextPage } =
    useHomeHook();

  return (
    <main className="p-6 md:p-10">
      <h1 className="text-3xl font-bold mb-6 text-center">📚 BookStore</h1>

      {loading && currentPage === 1 ? (
        <p className="text-center">Loading books...</p>
      ) : (
        <InfiniteScroll
          dataLength={books.length}
          next={fetchNextPage}
          hasMore={currentPage < totalPages}
          loader={<p className="text-center mt-4">Loading more books...</p>}
          endMessage={
            <p className="text-center mt-4 text-gray-500">
              🎉 You’ve reached the end!
            </p>
          }
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {books.map((book: BookType) => (
              <BookCard key={book.image} book={book} />
            ))}
          </div>
        </InfiniteScroll>
      )}
    </main>
  );
}
