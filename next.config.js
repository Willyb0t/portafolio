/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [],
    formats: ['image/avif', 'image/webp'],
  },
  // Add any additional configurations here
  // For example, analytics, webpack config, etc.
};

module.exports = nextConfig;