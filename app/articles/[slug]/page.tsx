import { compileMDX } from 'next-mdx-remote/rsc';
import { notFound } from 'next/navigation';

import fs from 'fs/promises';
import path from 'path';

import { Container } from '@/components/container';
import { getMDXComponents } from '@/components/mdx';
import { type Article, type Frontmatter, getAllArticles } from '@/content/articles';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const post = await getArticle(slug);

  if (!post) {
    return;
  }

  const { title, date: publishedTime, description, image } = post;
  const ogImage = image
    ? `https://raviatluri.in${image}`
    : `https://raviatluri.in/og?title=${title}&subtitle=${description}`;

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

export default async function Article({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const post = await getArticle(slug);

  if (!post) {
    notFound();
  }

  return (
    <>
      <Container className="mt-8 lg:mt-16">
        <div className="mx-auto max-w-2xl">
          <article>
            <header className="flex flex-col">
              <h1 className="mt-6 text-4xl font-bold tracking-tight text-zinc-800">{post.title}</h1>
              <div className="flex items-center text-base text-zinc-400 my-4">
                <time dateTime={post.date}>{post.date}</time>
                {post.tags && (
                  <>
                    <span className="mx-2">•</span>
                    {post.tags.map((tag, index) => (
                      <span key={tag}>
                        <a
                          href={`/tags/${tag}`}
                          className="hover:text-zinc-500 dark:hover:text-zinc-400"
                        >
                          #{tag}
                        </a>
                        {index < post.tags.length - 1 && ', '}
                      </span>
                    ))}
                  </>
                )}
              </div>
            </header>
            <div className="text-lg text-zinc-600">{post.content}</div>
          </article>
        </div>
      </Container>
    </>
  );
}

async function getArticle(slug: string) {
  const fileContent = await fs.readFile(
    path.join(process.cwd(), 'content/articles', `${slug}.mdx`),
    'utf-8'
  );

  const { content, frontmatter } = await compileMDX<Frontmatter>({
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
    href: `/articles/${slug}`,
  } as Article;
}

export async function generateStaticParams() {
  const articles = await getAllArticles();
  return articles.map(article => ({
    slug: article.slug,
  }));
}
