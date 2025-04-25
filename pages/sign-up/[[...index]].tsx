/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    serverActions: true, // Enable Server Actions for Clerk
  },
};

module.exports = nextConfig;