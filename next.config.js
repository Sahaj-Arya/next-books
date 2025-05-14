/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  basePath: "/next-books",
  assetPrefix: "/next-books/",
};

exports = nextConfig;
