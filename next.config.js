/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '8055',
        pathname: '/assets/**',
      },
      {
        protocol: 'https',
        hostname: '**.directus.app',
        pathname: '/assets/**',
      },
      {
        protocol: 'https',
        hostname: '**.cloud.directus.io',
        pathname: '/assets/**',
      },
    ],
  },
};

module.exports = nextConfig;

