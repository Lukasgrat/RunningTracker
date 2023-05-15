/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    loader: "cloudinary",
    path: "https://res.cloudinary.com/dpqiblz7i/image/upload"
  }
}

module.exports = nextConfig
