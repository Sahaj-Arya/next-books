import { BookType } from "@/utils/types";
import Image from "next/image";
import Link from "next/link";

export default function BookCard({ book }: { readonly book: BookType }) {
  return (
    <Link href={`/books/${encodeURIComponent(book.title)}`}>
      <div className="border p-4 rounded-lg shadow-lg hover:shadow-xl flex flex-col items-center text-center bg-black transition duration-200 h-[500px] max-w-xs mx-auto">
        <div className="relative w-full h-[250px]">
          <Image
            src={book.image}
            alt={book.title}
            fill
            style={{ objectFit: "cover" }}
            className="rounded-lg"
            priority
          />
        </div>
        <h2 className="text-lg font-semibold mb-2 truncate text-wrap">
          {book.title}
        </h2>
        <p className="text-green-600 font-bold mb-2">${book.price}</p>
        <p className="text-sm text-gray-600 mb-2">
          <strong>Rating:</strong> {book.rating} / 5
        </p>
        <p className="text-sm text-gray-600 mb-2">
          <strong>Category:</strong> {book.category}
        </p>
        <p className="text-sm text-gray-600 mb-4">
          <strong>Status:</strong> {book.Availability}
        </p>
      </div>
    </Link>
  );
}
