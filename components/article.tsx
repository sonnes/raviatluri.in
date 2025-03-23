import Link from 'next/link';

import type { Article } from '@/content/articles';

export default function ArticleCard({ article }: { article: Article }) {
  return (
    <article className="group flex flex-col items-start group-hover:bg-zinc-100 rounded-lg">
      <div className="flex items-center gap-2 text-sm text-zinc-400">
        <time dateTime={article.date}>{formatDate(article.date)}</time>
      </div>

      <h2 className="mt-2 text-xl font-semibold tracking-tight text-zinc-800">
        <Link href={article.href}>
          <span className="group-hover:text-red-500 transition-colors duration-200">
            {article.title}
          </span>
        </Link>
      </h2>

      <p className="mt-2 text-base text-zinc-600">{article.description}</p>

      <Link
        href={article.href}
        className="mt-4 text-sm font-medium text-zinc-500 group-hover:text-red-500 transition-colors duration-200"
      >
        Read &rarr;
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
