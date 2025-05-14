import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import { BookType } from "@/utils/types";

const filePath = path.join(process.cwd(), "src/data", "book.json");

function normalizeTitle(title: string) {
  return decodeURIComponent(title).toLowerCase();
}

async function readBooks(): Promise<BookType[]> {
  const data = await fs.readFile(filePath, "utf-8");
  return JSON.parse(data);
}

async function writeBooks(books: BookType[]) {
  await fs.writeFile(filePath, JSON.stringify(books, null, 2));
}

// Dynamic route params must be extracted from `req.nextUrl`
function getTitleFromUrl(req: NextRequest) {
  const segments = req.nextUrl.pathname.split("/");
  return segments[segments.length - 1]; // Get [title] from URL
}

// GET /api/books/[title]
export async function GET(req: NextRequest) {
  const title = getTitleFromUrl(req);
  console.log("req", title);
  const books = await readBooks();
  const book = books.find(
    (b) => b.title.toLowerCase() === normalizeTitle(title)
  );
  if (!book) {
    return NextResponse.json({ error: "Book not found" }, { status: 404 });
  }

  return NextResponse.json(book);
}

// PUT /api/books/[title]
export async function PUT(req: NextRequest) {
  const title = getTitleFromUrl(req);
  const updatedData = await req.json();
  const books = await readBooks();

  const index = books.findIndex(
    (b) => b.title.toLowerCase() === normalizeTitle(title)
  );
  if (index === -1) {
    return NextResponse.json({ error: "Book not found" }, { status: 404 });
  }

  books[index] = { ...books[index], ...updatedData };
  await writeBooks(books);

  return NextResponse.json(books[index]);
}

// DELETE /api/books/[title]
export async function DELETE(req: NextRequest) {
  const title = getTitleFromUrl(req);
  const books = await readBooks();
  const filtered = books.filter(
    (b) => b.title.toLowerCase() !== normalizeTitle(title)
  );

  if (filtered.length === books.length) {
    return NextResponse.json({ error: "Book not found" }, { status: 404 });
  }

  await writeBooks(filtered);
  return NextResponse.json({ message: "Book deleted" });
}
