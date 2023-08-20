import { withContentlayer } from 'next-contentlayer';

import { withSitemap } from './sitemap';

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'mdx', 'sitemap.ts'],
  reactStrictMode: true,
  experimental: {
    scrollRestoration: true,
  },
};

export const sitemapOptions = {
  // Specify the sitemap configuration here
};

export default withSitemap(withContentlayer(nextConfig));
