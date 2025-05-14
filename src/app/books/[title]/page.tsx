import React from "react";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Metadata } from "next";

type Props = {
  params: Promise<{
    title: string;
  }>;
};

export const dynamic = "force-dynamic";
// export const dynamic = "force-static";
// export const revalidate = 60;
// export const fetchCache = "force-no-store"; // Disable caching for this page
// export const runtime = "edge"; // Use edge runtime for faster response times
// export const preferredRegion = "auto"; // Automatically select the best region for the edge function

export const generateMetadata = async ({
  params,
}: Props): Promise<Metadata> => {
  const { title } = await params;
  const data = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/books/${title}`
  );
  const book = await data.json();

  const defaultImage =
    "https://upload.wikimedia.org/wikipedia/commons/b/b6/Image_created_with_a_mobile_phone.png";

  if (!book) {
    return {
      title: "Book Not Found | Sahaj",
      description: "The requested book could not be found.",
      icons: {
        icon: defaultImage, // Ensure this is a valid image URL for your site's icon
      },
    };
  }

  const imageUrl = book?.image || defaultImage; // Ensure the image exists

  return {
    title: `${book?.title} | Sahaj`,
    description: book?.description || "No description available.",
    openGraph: { images: [imageUrl] },
    icons: {
      icon: imageUrl, // Ensure this is a valid image URL for your site's icon
    },
  };
};

export default async function BookDetailPage({ params }: Props) {
  const { title } = await params;
  const data = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/books/${title}`
  );
  const book = await data.json();

  if (!book) return notFound();

  return (
    <div className="min-h-screen px-4 py-12 flex items-center justify-center bg-black">
      <div className="max-w-3xl w-full bg-black p-8 rounded-lg shadow-md">
        <div className="flex flex-col items-center space-y-6">
          <Image
            src={book.image}
            alt={book.title}
            width={350}
            height={500}
            priority
            style={{ objectFit: "cover" }}
            className="rounded-lg shadow-md"
          />
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-2 text-white">{book.title}</h1>
            <p className="text-xl text-green-600 font-semibold mb-4">
              ${book.price}
            </p>
            <p className="text-gray-300 mb-6">
              {book.description || "No description available."}
            </p>
          </div>

          <div className="w-full">
            <ul className="text-gray-300 text-sm grid gap-2 md:grid-cols-2">
              <li>
                <strong>UPC:</strong> {book.UPC}
              </li>
              <li>
                <strong>Category:</strong> {book.category}
              </li>
              <li>
                <strong>Availability:</strong> {book.Availability}
              </li>
              <li>
                <strong>Rating:</strong> {book.rating} / 5
              </li>
              <li>
                <strong>Reviews:</strong> {book["Number of reviews"]}
              </li>
              <li>
                <strong>Tax:</strong> {book.Tax}
              </li>
              <li>
                <strong>Price (excl. tax):</strong> {book["Price (excl. tax)"]}
              </li>
              <li>
                <strong>Price (incl. tax):</strong> {book["Price (incl. tax)"]}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
