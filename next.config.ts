import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: process.env.NEXT_PUBLIC_BUNNY_CDN_HOST || "mkc-cdn.b-cdn.net",
      },
    ],
  },
};

export default nextConfig;
