/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    serverActions: {}, // Ensure this is an object, even if empty
  },
};

module.exports = nextConfig;