import type { Metadata } from 'next';
import { compileMDX } from 'next-mdx-remote/rsc';
import { notFound } from 'next/navigation';

import fs from 'fs/promises';
import path from 'path';

import { Container } from '@/components/container';
import { useMDXComponents } from '@/components/mdx';
import { type Article, type Frontmatter, getAllArticles } from '@/content/articles';

export default async function Article({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const post = await getArticle(slug);

  if (!post) {
    notFound();
  }

  return (
    <>
      <Container className="mt-16 lg:mt-32">
        <div className="xl:relative">
          <div className="mx-auto max-w-2xl">
            <article>
              <header className="flex flex-col">
                <h1 className="mt-6 text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100">
                  {post.title}
                </h1>
                <time
                  dateTime={post.date}
                  className="order-first flex items-center text-base text-zinc-400 dark:text-zinc-500"
                >
                  <span className="h-4 w-0.5 rounded-full bg-zinc-200 dark:bg-zinc-500" />
                  <span className="ml-3">{post.date}</span>
                </time>
                {/* render tags */}
                {post.tags && (
                  <div className="mt-4 flex flex-wrap">
                    {post.tags.map(tag => (
                      <a
                        href={`/tags/${tag}`}
                        className="mb-2 mr-2 text-md text-zinc-400 hover:text-zinc-500 dark:text-zinc-500 dark:hover:text-zinc-400"
                        key={tag}
                      >
                        #{tag}
                      </a>
                    ))}
                  </div>
                )}
              </header>
            </article>
          </div>
        </div>
      </Container>
    </>
  );
}
async function getArticle(slug: string) {
  const fileContent = await fs.readFile(
    path.join(process.cwd(), 'content/articles', `${slug}.mdx`),
    'utf-8'
  );

  const { content, frontmatter } = await compileMDX<Frontmatter>({
    source: fileContent,
    options: {
      parseFrontmatter: true,
    },
    components: useMDXComponents(),
  });

  return {
    ...frontmatter,
    slug,
    content,
    href: `/articles/${slug}`,
  } as Article;
}

export async function generateStaticParams() {
  const articles = await getAllArticles();
  return articles.map(article => ({
    slug: article.slug,
  }));
}
