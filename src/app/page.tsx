import BookCard from "@/components/BookCard";
import { BookType } from "@/utils/types";

const ITEMS_PER_PAGE = 6;

type PageProps = {
  searchParams: {
    page?: string;
  };
};

export default async function HomePage({ searchParams }: PageProps) {
  const currentPage = parseInt(searchParams.page || "1");
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;

  let books: BookType[] = [];
  let totalPages = 1;

  try {
    const res = await fetch(
      `${baseUrl}/api/books?page=${currentPage}&limit=${ITEMS_PER_PAGE}`,
      {
        cache: "no-store",
      }
    );
    const data = await res.json();
    books = data.data;
    totalPages = data.totalPages;
  } catch (error) {
    console.error("Error fetching books:", error);
  }

  return (
    <main className="p-6 md:p-10">
      <h1 className="text-3xl font-bold mb-6 text-center">📚 BookStore</h1>

      {books.length === 0 ? (
        <p className="text-center">No books found.</p>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-10">
            {books.map((book: BookType) => (
              <BookCard key={book.image} book={book} />
            ))}
          </div>

          {/* Pagination Controls */}
          <div className="flex justify-center items-center gap-4">
            <a
              href={`/?page=${Math.max(currentPage - 1, 1)}`}
              className={`px-4 py-2 bg-gray-200 rounded text-black transition ${
                currentPage === 1 ? "opacity-50 pointer-events-none" : ""
              }`}
            >
              ⬅️ Previous
            </a>

            <span className="font-medium text-gray-800">
              Page <strong>{currentPage}</strong> of{" "}
              <strong>{totalPages}</strong>
            </span>

            <a
              href={`/?page=${Math.min(currentPage + 1, totalPages)}`}
              className={`px-4 py-2 bg-gray-200 rounded text-black transition ${
                currentPage === totalPages
                  ? "opacity-50 pointer-events-none"
                  : ""
              }`}
            >
              Next ➡️
            </a>
          </div>
        </>
      )}
    </main>
  );
}
