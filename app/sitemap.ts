import { allArticles } from 'contentlayer/generated';
import { allSnippets } from 'contentlayer/generated';
import { MetadataRoute } from 'next';

import navigation from '@/lib/navigation';

export default function sitemap(): MetadataRoute.Sitemap {
  const urls = [
    {
      url: 'https://raviatluri.in',
      lastModified: new Date(),
    },
  ];

  for (const nav of navigation) {
    if (nav.href.startsWith('/')) {
      urls.push({
        url: `https://raviatluri.in${nav.href}`,
        lastModified: new Date(),
      });
    }
  }

  for (const article of allArticles) {
    urls.push({
      url: `https://raviatluri.in$/{article.slug}`,
      lastModified: new Date(article.date),
    });
  }

  for (const snippet of allSnippets) {
    urls.push({
      url: `https://raviatluri.in/${snippet.slug}`,
      lastModified: new Date(snippet.date),
    });
  }

  return urls;
}
