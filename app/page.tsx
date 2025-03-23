import Image from 'next/image';

import ArticleCard from '@/components/article';
import { Container } from '@/components/container';
import { GitHubIcon, InstagramIcon, LinkedInIcon, TwitterIcon } from '@/components/icons';
import { SocialLink } from '@/components/links';
import Photos from '@/components/photos';
import Resume from '@/components/resume';
import { getAllArticles } from '@/content/articles';
import resume from '@/content/resume';

export default async function Home() {
  const articles = await getAllArticles();

  return (
    <>
      <Container className="mt-9">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Main content area - stacks on mobile, takes up 2/3 on larger screens */}
          <div className="md:col-span-2">
            <div className="space-y-10 border-l border-zinc-200 pl-6">
              <h2 className="text-xl font-bold">Recent Articles</h2>
              {articles.map(article => (
                <ArticleCard key={article.slug} article={article} />
              ))}
            </div>
          </div>

          {/* Sidebar - stacks on mobile, takes up 1/3 on larger screens */}
          <div className="md:col-span-1">
            <div className="space-y-4 ml-6">
              <h1 className="text-2xl font-bold">Ravi Atluri</h1>
              <p className="text-zinc-600">
                Sr. Principal Architect at Gojek. Working on scalable and reliable systems &
                abstractions for product engineering teams.
              </p>
              <div className="mt-6 flex gap-6">
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
              <Resume />
              <Photos />
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}
