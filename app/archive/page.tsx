import Link from 'next/link';

import { Container } from '@/components/container';
import { getAllArchivePosts } from '@/content/archive';

export const metadata = {
  title: 'Archive',
  description: 'Old blog posts from 2005-2009, migrated from sonnestrahlen on Blogspot.',
};

export default async function ArchiveIndex() {
  const posts = await getAllArchivePosts();

  // Group posts by year
  const postsByYear = new Map<number, typeof posts>();
  for (const post of posts) {
    const year = new Date(post.date).getFullYear();
    const existing = postsByYear.get(year) || [];
    existing.push(post);
    postsByYear.set(year, existing);
  }

  const years = [...postsByYear.keys()].sort((a, b) => b - a);

  return (
    <Container className="mt-8 sm:mt-14">
      <header className="max-w-3xl mb-10">
        <h1 className="text-4xl font-bold tracking-tight text-primary sm:text-5xl">Archive</h1>
        <p className="mt-6 text-base text-text-secondary">
          Old blog posts from 2005&ndash;2009, migrated from{' '}
          <a
            href="https://raviatluri.blogspot.com"
            className="text-primary hover:text-primary/80"
            target="_blank"
            rel="noopener noreferrer"
          >
            sonnestrahlen
          </a>{' '}
          on Blogspot.
        </p>
      </header>

      <div className="max-w-3xl">
        {years.map(year => (
          <section key={year} className="mb-12">
            <h2 className="text-lg font-semibold text-secondary mb-4">{year}</h2>
            <div className="flex flex-col space-y-6 border-l border-secondary/30 pl-6">
              {postsByYear.get(year)!.map(post => (
                <article key={post.slug} className="group relative flex flex-col items-start">
                  <div className="absolute -inset-x-4 -inset-y-4 z-0 scale-95 bg-surface-50 opacity-0 transition group-hover:scale-100 group-hover:opacity-100 sm:-inset-x-6 sm:rounded-sm" />
                  <div className="relative z-10 flex items-center gap-2 text-sm text-secondary">
                    <time dateTime={post.date}>{formatDate(post.date)}</time>
                  </div>
                  <h3 className="relative z-10 mt-1 text-lg font-semibold tracking-tight text-text-primary">
                    <Link href={post.href}>
                      <span className="group-hover:text-primary transition-colors duration-200">
                        {post.title}
                      </span>
                    </Link>
                  </h3>
                  <p className="relative z-10 mt-1 text-sm text-text-secondary line-clamp-2">
                    {post.description}
                  </p>
                </article>
              ))}
            </div>
          </section>
        ))}
      </div>
    </Container>
  );
}

function formatDate(date: string) {
  return new Date(date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  });
}
