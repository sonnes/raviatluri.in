import { withContentlayer } from 'next-contentlayer';

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'mdx'],
  reactStrictMode: true,
  experimental: {
    scrollRestoration: true,
  },
  async rewrites() {
    return [
      // Existing rewrites...
      {
        source: '/sitemap.xml',
        destination: '/sitemap.xml',
      },
    ];
  },
};

export default withContentlayer(nextConfig);
