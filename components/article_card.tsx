import type { Article } from 'contentlayer/generated';

import { formatDate } from '@/lib/formatDate';

export default function ArticleCard({ article }: { article: Article }) {
  return (
    <article className="group relative flex flex-col items-start">
      <div className="absolute -inset-x-4 -inset-y-6 z-0 scale-95 bg-zinc-50 opacity-0 transition group-hover:scale-100 group-hover:opacity-100 dark:bg-zinc-800/50 sm:-inset-x-6 sm:rounded-2xl" />
      <div className="relative z-10 flex w-full items-center justify-between gap-4">
        <h2 className="text-base font-semibold tracking-tight text-zinc-800 dark:text-zinc-100">
          <a href={article.slug}>
            <span className="absolute -inset-x-4 -inset-y-6 z-20 sm:-inset-x-6 sm:rounded-2xl" />
            <span className="relative z-10">{article.title}</span>
          </a>
        </h2>
        <time
          className="flex items-center text-sm text-zinc-400 dark:text-zinc-500"
          dateTime={article.date}
        >
          {formatDate(article.date)}
        </time>
      </div>
      <p className="relative z-10 mt-2 text-sm text-zinc-600 dark:text-zinc-400">
        {article.description}
      </p>
      <a
        href={article.slug}
        className="relative z-10 mt-4 flex items-center text-sm font-medium text-red-500"
      >
        Read
      </a>
    </article>
  );
}
