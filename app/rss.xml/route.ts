import { generateRSSFeed } from '@/lib/rss';

export async function GET() {
  const feed = await generateRSSFeed();

  return new Response(feed, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
    },
  });
}
