/** @type {import('next').NextConfig} */
const nextConfig = {
  // async rewrites() {
  //   return [
  //     {
  //       source: '/api/:path*',
  //       destination: 'https://soundbyte-next.vercel.app/api/:path*',
  //     },
  //   ];
  // },
  images: {
    domains: ['images.clerk.dev'],
  },
};

module.exports = nextConfig;
