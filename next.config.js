/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['tricky-photoshop.com'],
  }
}

module.exports = nextConfig
