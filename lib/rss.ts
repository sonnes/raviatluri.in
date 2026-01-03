import { Feed } from 'feed';
import fs from 'fs/promises';
import path from 'path';

const SITE_URL = 'https://raviatluri.in';

interface ArticleForFeed {
  title: string;
  slug: string;
  date: string;
  description: string;
  tags: string[];
  image?: string;
  content: string;
}

/**
 * Converts MDX content to simplified HTML for RSS feeds.
 * Strips React components and converts markdown to HTML.
 */
function mdxToHtml(mdxContent: string): string {
  // Remove frontmatter
  const contentWithoutFrontmatter = mdxContent.replace(/^---[\s\S]*?---\n*/m, '');

  // Remove JSX/React components like <Image />, <Video />
  let html = contentWithoutFrontmatter
    .replace(/<Image[^>]*src="([^"]*)"[^>]*alt="([^"]*)"[^>]*\/>/g, '<img src="$1" alt="$2" />')
    .replace(/<Image[^>]*\/>/g, '')
    .replace(/<Video[^>]*\/>/g, '')
    .replace(/<[A-Z][a-zA-Z]*[^>]*>[\s\S]*?<\/[A-Z][a-zA-Z]*>/g, '')
    .replace(/<[A-Z][a-zA-Z]*[^>]*\/>/g, '');

  // Convert relative image URLs to absolute
  html = html.replace(/src="\/([^"]*)"/g, `src="${SITE_URL}/$1"`);
  html = html.replace(/href="\/([^"]*)"/g, `href="${SITE_URL}/$1"`);

  // Basic markdown to HTML conversions
  html = html
    // Headers
    .replace(/^### (.+)$/gm, '<h3>$1</h3>')
    .replace(/^## (.+)$/gm, '<h2>$1</h2>')
    .replace(/^# (.+)$/gm, '<h1>$1</h1>')
    // Bold and italic
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(/\*([^*]+)\*/g, '<em>$1</em>')
    // Links
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>')
    // Code blocks (simple handling)
    .replace(/```[\w]*\n([\s\S]*?)```/g, '<pre><code>$1</code></pre>')
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    // Lists
    .replace(/^- (.+)$/gm, '<li>$1</li>')
    // Paragraphs (double newlines)
    .replace(/\n\n+/g, '</p><p>')
    // Wrap in paragraph tags
    .replace(/^(.+)$/gm, match => {
      if (match.startsWith('<')) return match;
      return match;
    });

  // Wrap list items
  html = html.replace(/(<li>.*<\/li>\n?)+/g, '<ul>$&</ul>');

  // Wrap content in paragraph if not already wrapped
  if (!html.startsWith('<')) {
    html = `<p>${html}</p>`;
  }

  return html.trim();
}

async function getArticlesForFeed(): Promise<ArticleForFeed[]> {
  const articlesDir = path.join(process.cwd(), 'content/articles');
  const filenames = await fs.readdir(articlesDir);

  const articlePromises = filenames
    .filter(f => f.endsWith('.mdx'))
    .map(async (filename): Promise<ArticleForFeed | null> => {
      const filePath = path.join(articlesDir, filename);
      const fileContent = await fs.readFile(filePath, 'utf-8');

      // Parse frontmatter
      const frontmatterMatch = fileContent.match(/^---\n([\s\S]*?)\n---/);
      if (!frontmatterMatch) return null;

      const frontmatter = frontmatterMatch[1];
      const getValue = (key: string): string => {
        const match = frontmatter.match(new RegExp(`^${key}:\\s*(.+)$`, 'm'));
        return match ? match[1].trim() : '';
      };

      const tagsMatch = frontmatter.match(/^tags:\s*\[(.*)\]$/m);
      const tags = tagsMatch
        ? tagsMatch[1].split(',').map(t => t.trim().replace(/['"]/g, ''))
        : [];

      const title = getValue('title');
      const date = getValue('date');

      if (!title || !date) return null;

      return {
        title,
        slug: filename.replace('.mdx', ''),
        date,
        description: getValue('description'),
        tags,
        image: getValue('image') || undefined,
        content: fileContent,
      };
    });

  const articles = await Promise.all(articlePromises);

  return articles
    .filter((a): a is ArticleForFeed => a !== null)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export async function generateRSSFeed(): Promise<string> {
  const articles = await getArticlesForFeed();

  const feed = new Feed({
    title: 'Ravi Atluri',
    description:
      'Product Engineer at GoFood in Gojek. Working scalable and reliable systems & abstractions for product engineering teams.',
    id: SITE_URL,
    link: SITE_URL,
    language: 'en',
    image: `${SITE_URL}/og.png`,
    favicon: `${SITE_URL}/favicon.ico`,
    copyright: `All rights reserved ${new Date().getFullYear()}, Ravi Atluri`,
    feedLinks: {
      rss2: `${SITE_URL}/rss.xml`,
    },
    author: {
      name: 'Ravi Atluri',
      link: SITE_URL,
    },
  });

  for (const article of articles) {
    const articleUrl = `${SITE_URL}/articles/${article.slug}`;
    const htmlContent = mdxToHtml(article.content);

    feed.addItem({
      title: article.title,
      id: articleUrl,
      link: articleUrl,
      description: article.description,
      content: htmlContent,
      date: new Date(article.date),
      category: article.tags.map(tag => ({ name: tag })),
      image: article.image ? `${SITE_URL}${article.image}` : undefined,
    });
  }

  return feed.rss2();
}
