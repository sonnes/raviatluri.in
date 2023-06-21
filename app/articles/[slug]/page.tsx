import { notFound } from 'next/navigation';

import { allArticles } from 'contentlayer/generated';
import type { Metadata } from 'next';

import { Container } from '@/components/container';
import { ArrowLeftIcon } from '@/components/icons';
import { MDX } from '@/components/mdx';
import { formatDate } from '@/lib/formatDate';

export async function generateStaticParams() {
  return allArticles.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata | undefined> {
  const post = allArticles.find(
    (post) => post.slug === `articles/${params.slug}`
  );
  if (!post) {
    return;
  }

  const { title, date: publishedTime, description, image, slug } = post;
  const ogImage = image
    ? `https://raviatluri.in${image}`
    : `https://raviatluri.in/api/og?title=${title}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'article',
      publishedTime,
      url: `https://raviatluri.in/${slug}`,
      images: [
        {
          url: ogImage,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
  };
}

export default async function Article({
  params,
}: {
  params: { slug: string };
}) {
  const post = allArticles.find(
    (post) => post.slug === `articles/${params.slug}`
  );

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
                <h1 className="mt-6 text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">
                  {post.title}
                </h1>
                <time
                  dateTime={post.date}
                  className="order-first flex items-center text-base text-zinc-400 dark:text-zinc-500"
                >
                  <span className="h-4 w-0.5 rounded-full bg-zinc-200 dark:bg-zinc-500" />
                  <span className="ml-3">{formatDate(post.date)}</span>
                </time>
                {/* render tags */}
                {post.tags && (
                  <div className="mt-4 flex flex-wrap">
                    {post.tags.map((tag) => (
                      <a
                        href={`/tags/${tag}`}
                        className="mb-2 mr-2 text-sm text-zinc-400 hover:text-zinc-500 dark:text-zinc-500 dark:hover:text-zinc-400"
                        key={tag}
                      >
                        #{tag}
                      </a>
                    ))}
                  </div>
                )}
              </header>
              <MDX code={post.body.code} />
            </article>
          </div>
        </div>
      </Container>
    </>
  );
}
