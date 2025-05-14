/** @type {import('next').NextConfig} */
const nextConfig = {
  images: { domains: ["books.toscrape.com"] },
  headers: async () => {
    return process.env.VERCEL_ENV === "production"
      ? [] // ✅ allow indexing
      : [
          {
            source: "/(.*)",
            headers: [
              {
                key: "X-Robots-Tag",
                value: "noindex", // ❌ only for preview or dev
              },
            ],
          },
        ];
  },
};

module.exports = nextConfig;
