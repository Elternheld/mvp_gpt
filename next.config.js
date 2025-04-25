/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    serverActions: {}, // Replace the boolean with an empty object
  },
};

module.exports = nextConfig;