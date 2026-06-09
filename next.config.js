/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [],
    formats: ['image/avif', 'image/webp'],
  },
  experimental: {
    appDir: true,
  },
  // Add any additional configurations here
  // For example, analytics, webpack config, etc.
};

module.exports = nextConfig;