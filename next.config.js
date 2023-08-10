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
    domains: ['images.clerk.dev', 'source.boringavatars.com'],
  },
};

module.exports = nextConfig;
