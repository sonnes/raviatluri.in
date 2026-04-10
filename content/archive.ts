import { compileMDX } from 'next-mdx-remote/rsc';

import fs from 'fs/promises';
import path from 'path';

export interface ArchiveFrontmatter {
  title: string;
  date: string;
  description: string;
  tags: string[];
  originalUrl?: string;
}

export type ArchivePost = ArchiveFrontmatter & {
  slug: string;
  href: string;
  content: React.ReactNode;
};

async function getArchivePosts(): Promise<ArchivePost[]> {
  try {
    const filenames = await fs.readdir(path.join(process.cwd(), 'content/archive'));

    const postPromises = filenames.map(async filename => {
      try {
        const fileContent = await fs.readFile(
          path.join(process.cwd(), 'content/archive', filename),
          'utf-8'
        );

        const { frontmatter } = await compileMDX<ArchiveFrontmatter>({
          source: fileContent,
          options: {
            parseFrontmatter: true,
          },
        });

        const slug = filename.replace('.mdx', '');

        return {
          ...frontmatter,
          slug,
          href: `/archive/${slug}`,
        } as ArchivePost;
      } catch (error) {
        console.error(`Error processing archive post ${filename}:`, error);
        return null;
      }
    });

    const results = await Promise.all(postPromises);
    return results.filter((post): post is ArchivePost => post !== null);
  } catch (error) {
    console.error('Error loading archive posts:', error);
    return [];
  }
}

let archivePosts: ArchivePost[] = [];

export async function getAllArchivePosts() {
  if (archivePosts.length === 0) {
    archivePosts = await getArchivePosts();
  }
  return archivePosts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}
