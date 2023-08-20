import { withContentlayer } from 'next-contentlayer';

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'mdx', 'sitemap.ts'],
  reactStrictMode: true,
  experimental: {
    scrollRestoration: true,
  },
};

export default withContentlayer(nextConfig);
