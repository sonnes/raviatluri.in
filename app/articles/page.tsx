import { allArticles } from 'contentlayer/generated';
import type { Metadata } from 'next';

import ArticleCard from '@/components/article_card';
import { SimpleLayout } from '@/components/simple_layout';

export const metadata: Metadata = {
  title: 'Articles',
  description:
    'All of my thoughts on Golang, system design, accessibility, ALS and more, collected in chronological order.',
};

export default function ArticlesIndex() {
  const articles = allArticles.sort((a, b) => b.date.localeCompare(a.date));

  return (
    <>
      <SimpleLayout
        title="Writing on system design, engineering management, accessibility and ALS"
        intro="All of my thoughts on Golang, system design, accessibility, ALS and more, collected in chronological order."
      >
        <div className="">
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
