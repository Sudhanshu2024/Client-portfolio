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
      {
        protocol: 'https',
        hostname: 'cms.parthkoshti.com', // ✅ your actual Directus domain
        pathname: '/assets/**',
      },
    ],
  },
  experimental: {
    esmExternals: true, // ✅ allows importing ESM-only modules (like next-mdx-remote/rsc)
  },
};

module.exports = nextConfig;
