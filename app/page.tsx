import Image from 'next/image';

import ArticleCard from '@/components/article';
import { Container } from '@/components/container';
import { GitHubIcon, InstagramIcon, LinkedInIcon, TwitterIcon } from '@/components/icons';
import { SocialLink } from '@/components/links';
import Photos from '@/components/photos';
import { getAllArticles } from '@/content/articles';

export default async function Home() {
  const articles = await getAllArticles();

  return (
    <>
      <Container className="mt-9">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          <div>
            <h1 className="text-4xl font-bold mb-4">Ravi Atluri</h1>
            <p className="text-zinc-600">
              Sr. Principal Architect at Gojek. Working on scalable and reliable systems &
              abstractions for product engineering teams.
            </p>
          </div>
          <div className="flex gap-6 md:justify-end items-start">
            <SocialLink
              href="https://twitter.com/sonnes"
              aria-label="Follow on Twitter"
              icon={TwitterIcon}
            />
            <SocialLink
              href="https://instagram.com/sonnes"
              aria-label="Follow on Instagram"
              icon={InstagramIcon}
            />
            <SocialLink
              href="https://github.com/sonnes"
              aria-label="Follow on GitHub"
              icon={GitHubIcon}
            />
            <SocialLink
              href="https://www.linkedin.com/in/atluriravi"
              aria-label="Follow on LinkedIn"
              icon={LinkedInIcon}
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Main content area - stacks on mobile, takes up 2/3 on larger screens */}
          <div className="md:col-span-2">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-xl font-bold">Recent Articles</h2>
              <a href="/articles" className="text-sm text-zinc-500 hover:text-zinc-800">
                View all →
              </a>
            </div>
            <div className="space-y-12 border-l border-zinc-200 pl-6">
              {articles.slice(0, 5).map(article => (
                <ArticleCard key={article.slug} article={article} />
              ))}
            </div>
          </div>

          {/* Sidebar - stacks on mobile, takes up 1/3 on larger screens */}
          <div className="md:col-span-1">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold">Photos</h2>
                <a href="/photos" className="text-sm text-zinc-500 hover:text-zinc-800">
                  View all →
                </a>
              </div>
              <Photos />
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}
