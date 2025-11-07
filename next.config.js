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
        protocol: "https",
        hostname: "cms.parthkoshti.com",
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
  // Removed experimental.esmExternals - no longer needed in Next.js 16
  // ESM externals are handled automatically
};

module.exports = nextConfig;
