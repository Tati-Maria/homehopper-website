/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: ["lh3.googleusercontent.com", "res.cloudinary.com", 'platform-lookaside.fbsbx.com']
  }
}

module.exports = nextConfig
