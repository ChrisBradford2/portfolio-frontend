/** @type {import('next').NextConfig} */
const nextConfig = {
  // reactStrictMode: true,
  images: {
    domains: ['localhost'],
  },
  env: {
    API_URL: process.env.API_URL,
    API_TOKEN: process.env.API_TOKEN,
    SENDGRID_API_KEY: process.env.SENDGRID_API_KEY,
  },
}

module.exports = nextConfig
