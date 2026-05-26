import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      { protocol: "https", hostname: "**.b-cdn.net" },
    ],
  },
  experimental: {
    // Uploads go through a Server Action (uploadImageAction). Default body
    // limit is 1MB → product photos failed in prod. Match the 15MB action cap
    // plus multipart overhead.
    serverActions: {
      bodySizeLimit: "20mb",
    },
  },
};

export default nextConfig;
