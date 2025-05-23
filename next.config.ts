import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  pageExtensions: ['ts', 'tsx', 'mdx'],
  images: {
    remotePatterns: [
      {
        hostname: 'imgs.xkcd.com',
      },
    ],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: '10mb',
    },
  },

  async redirects() {
    return [
      {
        source: '/articles/building-xdb',
        destination: '/articles/introducing-xdb',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
