import { compileMDX } from 'next-mdx-remote/rsc';
import { notFound } from 'next/navigation';

import fs from 'fs/promises';
import path from 'path';

import { Container } from '@/components/container';
import { getMDXComponents } from '@/components/mdx';
import { type ArchiveFrontmatter, type ArchivePost, getAllArchivePosts } from '@/content/archive';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getArchivePost(slug);

  if (!post) return;

  const { title, date: publishedTime, description } = post;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'article',
      publishedTime,
      url: `https://raviatluri.in/archive/${slug}`,
    },
  };
}

export default async function ArchivePostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getArchivePost(slug);

  if (!post) {
    notFound();
  }

  return (
    <Container className="mt-8 sm:mt-14">
      <div className="mx-auto max-w-2xl">
        <article>
          <header className="flex flex-col">
            <time dateTime={post.date} className="text-base font-semibold text-text-muted">
              {formatDate(post.date)}
            </time>
            <h1 className="text-4xl font-bold tracking-tight text-text-primary">{post.title}</h1>
            <div className="flex items-center text-base text-text-muted my-4">
              {post.tags &&
                post.tags.map((tag, index) => (
                  <span key={tag} className="pl-1">
                    #{tag}
                    {index < post.tags.length - 1 && ', '}
                  </span>
                ))}
            </div>
            <p className="text-xs text-text-muted italic">
              Originally published on{' '}
              <a
                href={post.originalUrl || 'https://raviatluri.blogspot.com'}
                className="text-primary hover:text-primary/80"
                target="_blank"
                rel="noopener noreferrer"
              >
                sonnestrahlen
              </a>
            </p>
          </header>
          <div className="text-md text-text-secondary mt-6">{post.content}</div>
        </article>
      </div>
    </Container>
  );
}

async function getArchivePost(slug: string) {
  try {
    const fileContent = await fs.readFile(
      path.join(process.cwd(), 'content/archive', `${slug}.mdx`),
      'utf-8'
    );

    const { content, frontmatter } = await compileMDX<ArchiveFrontmatter>({
      source: fileContent,
      options: {
        parseFrontmatter: true,
      },
      components: getMDXComponents(),
    });

    return {
      ...frontmatter,
      slug,
      content,
      href: `/archive/${slug}`,
    } as ArchivePost;
  } catch {
    return null;
  }
}

export async function generateStaticParams() {
  const posts = await getAllArchivePosts();
  return posts.map(post => ({
    slug: post.slug,
  }));
}

function formatDate(date: string) {
  return new Date(date).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
}
