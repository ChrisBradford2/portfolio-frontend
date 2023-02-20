/** @type {import('next').NextConfig} */
const nextConfig = {
  // reactStrictMode: true,
  images: {
    domains: [
      'localhost',
      'nicolas-barbarisi-backend.herokuapp.com',
      'res.cloudinary.com'
    ],
  },
  env: {
    API_URL: process.env.API_URL,
    API_TOKEN: process.env.API_TOKEN,
    SENDGRID_API_KEY: process.env.SENDGRID_API_KEY,
    SENDGRID_API_EMAIL: process.env.SENDGRID_API_EMAIL
  },
}

module.exports = nextConfig
