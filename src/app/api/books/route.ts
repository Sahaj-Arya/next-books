// app/api/books/route.ts
import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

const filePath = path.join(process.cwd(), "src/data", "book.json");

// GET with pagination support
export async function GET(req: Request) {
  const url = new URL(req.url);
  const page = parseInt(url.searchParams.get("page") || "1");
  const limit = parseInt(url.searchParams.get("limit") || "6");

  const data = await fs.readFile(filePath, "utf-8");
  const books = JSON.parse(data);

  const total = books.length;
  const totalPages = Math.ceil(total / limit);
  const start = (page - 1) * limit;
  const paginatedBooks = books.slice(start, start + limit);

  return NextResponse.json({
    data: paginatedBooks,
    total,
    page,
    totalPages,
  });
}

// POST - Add new book
export async function POST(req: Request) {
  const newBook = await req.json();
  const data = await fs.readFile(filePath, "utf-8");
  const books = JSON.parse(data);

  books.push(newBook);
  await fs.writeFile(filePath, JSON.stringify(books, null, 2));

  return NextResponse.json(newBook, { status: 201 });
}
