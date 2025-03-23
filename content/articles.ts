import { compileMDX } from 'next-mdx-remote/rsc';

import fs from 'fs/promises';
import path from 'path';

export interface Frontmatter {
  title: string;
  date: string;
  description: string;
  tags: string[];
  image?: string;
}

export type Article = Frontmatter & {
  slug: string;
  href: string;
  content: React.ReactNode;
};

async function getArticles(): Promise<Article[]> {
  try {
    const filenames = await fs.readdir(path.join(process.cwd(), 'content/articles'));

    const articlePromises = filenames.map(async filename => {
      try {
        const fileContent = await fs.readFile(
          path.join(process.cwd(), 'content/articles', filename),
          'utf-8'
        );

        const { frontmatter } = await compileMDX<Frontmatter>({
          source: fileContent,
          options: {
            parseFrontmatter: true,
          },
        });

        const slug = filename.replace('.mdx', '');

        return {
          ...frontmatter,
          slug,
          href: `/articles/${slug}`,
        } as Article;
      } catch (error) {
        console.error(`Error processing article ${filename}:`, error);
        return null;
      }
    });

    const results = await Promise.all(articlePromises);
    return results.filter((article): article is Article => article !== null);
  } catch (error) {
    console.error('Error loading articles:', error);
    return [];
  }
}

// Initialize articles
let articles: Article[] = [];

// Load articles
getArticles().then(loadedArticles => {
  articles = loadedArticles;
});

export async function getAllArticles() {
  if (articles.length === 0) {
    articles = await getArticles();
  }
  return articles.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}
