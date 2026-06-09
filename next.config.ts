import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    domains: [],
    formats: ['image/avif', 'image/webp'],
  },
  // Add any additional configurations here
  // For example, analytics, webpack config, etc.
};

export default nextConfig;