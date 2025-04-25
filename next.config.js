
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    forceSwcTransforms: true,
    outputFileTracingRoot: __dirname
  },
  output: 'standalone',
  runtime: 'nodejs'
}

module.exports = nextConfig
