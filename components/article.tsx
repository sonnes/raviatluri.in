import Link from 'next/link';

import type { Article } from '@/content/articles';

export default function ArticleCard({ article }: { article: Article }) {
  return (
    <article className="flex flex-col items-start">
      <div className="" />
      <div className="flex w-full items-center justify-between gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-zinc-600">
          <Link href={article.href}>
            <span>{article.title}</span>
          </Link>
        </h2>
        <time className="flex items-center text-md text-zinc-400" dateTime={article.date}>
          {formatDate(article.date)}
        </time>
      </div>
      <p className="mt-2 text-md text-zinc-500">{article.description}</p>
      <Link href={article.href} className="mt-4 flex items-center text-md font-medium text-red-500">
        Read
      </Link>
    </article>
  );
}

function formatDate(date: string) {
  return new Date(date).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
}
