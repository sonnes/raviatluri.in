import { notFound } from 'next/navigation';

import { allArticles } from 'contentlayer/generated';
import type { Metadata } from 'next';

import ArticleCard from '@/components/article_card';
import { SimpleLayout } from '@/components/simple_layout';

type Tag = {
  title: string;
  description: string;
};

const tags: Record<any, Tag> = {
  xdb: {
    title: 'XDB',
    description:
      'xdb is a library to model data as nodes, attributes, and edges in Go using any database.',
  },
  als: {
    title: 'ALS',
    description: 'Writing on my life with ALS.',
  },
  accessibility: {
    title: 'Accessibility',
    description: 'Writing on accessibility devices, tools, and experiences.',
  },
};

export async function generateStaticParams() {
  return allArticles
    .filter((post) => post.tags && post.tags.length > 0)
    .map((post) =>
      (post.tags as string[]).map((tag) => ({
        slug: tag,
      }))
    )
    .flat();
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata | undefined> {
  const tag = tags[params.slug];
  if (!tag) {
    return;
  }

  const { title, description } = tag;

  return {
    title,
    description,
  };
}

export default function TagIndex({ params }: { params: { slug: string } }) {
  const articles = allArticles
    .filter((post) => post.tags?.includes(params.slug))
    .sort((a, b) => b.date.localeCompare(a.date));

  if (tags[params.slug] === undefined) {
    notFound();
  }

  const tag = tags[params.slug];

  return (
    <>
      <SimpleLayout title={`#${tag.title}`} intro={tag.description}>
        <div className="md:border-l md:border-zinc-100 md:pl-6 md:dark:border-zinc-700/40">
          <div className="flex max-w-3xl flex-col space-y-16">
            {articles.map((article) => (
              <ArticleCard key={article.slug} article={article} />
            ))}
          </div>
        </div>
      </SimpleLayout>
    </>
  );
}
