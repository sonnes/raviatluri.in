import Link from 'next/link';

import type { Article } from '@/content/articles';

export default function ArticleCard({ article }: { article: Article }) {
  return (
    <article className="group relative flex flex-col items-start">
      <div className="absolute -inset-x-4 -inset-y-6 z-0 scale-95 bg-zinc-50 opacity-0 transition group-hover:scale-100 group-hover:opacity-100 sm:-inset-x-6 sm:rounded-sm" />
      <div className="relative z-10 flex items-center gap-2 text-sm text-zinc-400">
        <time dateTime={article.date}>{formatDate(article.date)}</time>
      </div>

      <h2 className="relative z-10 mt-2 text-xl font-semibold tracking-tight text-zinc-800">
        <Link href={article.href}>
          <span className="group-hover:text-red-500 transition-colors duration-200">
            {article.title}
          </span>
        </Link>
      </h2>

      <p className="relative z-10 mt-2 text-base text-zinc-600">{article.description}</p>

      <Link
        href={article.href}
        className="relative z-10 mt-4 text-sm font-medium text-zinc-500 group-hover:text-red-500 transition-colors duration-200"
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
