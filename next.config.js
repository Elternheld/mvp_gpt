/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    serverActions: {}, // Ensure this is an object, even if it's empty
  },
};

module.exports = nextConfig;