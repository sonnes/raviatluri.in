import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import ArticleCard from '@/components/article';
import { Container } from '@/components/container';
import { getAllArticles } from '@/content/articles';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata | undefined> {
  const { slug } = await params;

  const title = `#${slug}`;
  const description = `Articles on ${slug}`;

  return {
    title,
    description,
  };
}

export default async function TagIndex({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const title = `#${slug}`;
  const description = `Articles on ${slug}`;

  const allArticles = await getAllArticles();
  const articles = allArticles
    .filter(post => post.tags?.includes(slug))
    .sort((a, b) => b.date.localeCompare(a.date));

  if (articles.length === 0) {
    notFound();
  }

  return (
    <>
      <Container className="mt-8 sm:mt-16">
        <header className="max-w-3xl mb-10">
          <h1 className="text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100">
            {title}
          </h1>
          <p className="mt-6 text-lg text-zinc-600">{description}</p>
        </header>
        <div className="flex max-w-3xl flex-col space-y-16 border-l border-zinc-200 pl-6">
          <div className="flex max-w-3xl flex-col space-y-16">
            {articles.map(article => (
              <ArticleCard key={article.slug} article={article} />
            ))}
          </div>
        </div>
      </Container>
    </>
  );
}

export async function generateStaticParams() {
  const articles = await getAllArticles();

  const tags = articles.flatMap(article => article.tags || []);
  const uniqueTags = [...new Set(tags)];

  return uniqueTags.map(tag => ({
    slug: tag,
  }));
}
