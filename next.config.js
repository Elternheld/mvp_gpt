/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    serverActions: {}, // Ensure this is an object
  },
};

module.exports = nextConfig;