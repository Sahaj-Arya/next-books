/** @type {import('next').NextConfig} */
const nextConfig = {
  headers: async () => {
    return process.env.VERCEL_ENV === "production"
      ? [] // ✅ allow indexing
      : [
          {
            source: "/(.*)",
            headers: [
              {
                key: "X-Robots-Tag",
                value: "noindex",
              },
            ],
          },
        ];
  },
};

module.exports = nextConfig;
