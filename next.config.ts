import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  pageExtensions: ['ts', 'tsx', 'mdx'],

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
