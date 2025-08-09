import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["i.imgur.com", "placehold.co"],
  },
  experimental: {
    cacheComponents: true,
  },
};

export default nextConfig;
