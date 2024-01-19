/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["images.clerk.dev", "res.cloudinary.com"],
    remotePatterns: [
      { hostname: "images.unsplash.com" },
      { hostname: "drive.google.com" },
      { hostname: "cdnb.artstation.com" },
      { hostname: "lh3.googleusercontent.com" },
      { hostname: "res.cloudinary.com" },
      { hostname: "source.boringavatars.com" },
    ],
  },
  experimental: {
    serverActions: true,
  },
};

module.exports = nextConfig;
