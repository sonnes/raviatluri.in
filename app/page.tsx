import Image from 'next/image';
import { allArticles } from 'contentlayer/generated';
import { Container } from '@/components/container';
import {
  GitHubIcon,
  InstagramIcon,
  LinkedInIcon,
  TwitterIcon,
} from '@/components/icons';
import { SocialLink } from '@/components/links';
import Resume, { Experience } from '@/components/resume';
import logoGojek from '@/public/images/logos/gojek.jpeg';
import logoInfosys from '@/public/images/logos/infosys.jpeg';
import logoPagalguy from '@/public/images/logos/pg.jpeg';

import type { Article } from 'contentlayer/generated';
import { formatDate } from '@/lib/formatDate';
import photos from '@/lib/photos';

const resume: Experience[] = [
  {
    company: 'Gojek',
    title: 'Senior Principal Architect',
    logo: logoGojek,
    start: '2022',
    current: true,
  },
  {
    company: 'Gojek',
    title: 'Senior Engineering Manager',
    logo: logoGojek,
    start: '2019',
    end: '2022',
  },
  {
    company: 'PaGaLGuY',
    title: 'Director of Engineering',
    logo: logoPagalguy,
    start: '2011',
    end: '2019',
  },
  {
    company: 'Infosys',
    title: 'Senior Software Engineer',
    logo: logoInfosys,
    start: '2008',
    end: '2011',
  },
];

function Photos() {
  return (
    <div className="mt-6">
      <div className="grid grid-cols-3 gap-2">
        {photos.slice(0, 6).map((image, imageIndex) => (
          <div
            key={imageIndex}
            className="relative aspect-square overflow-hidden rounded-lg"
          >
            <Image
              src={image.src}
              alt=""
              sizes="(min-width: 640px) 18rem, 11rem"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

function Article({ article }: { article: Article }) {
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
      <a href={article.slug} className="relative z-10 mt-4 flex items-center text-sm font-medium text-red-500">
        Read
      </a>
    </article>
  );
}

export default async function Home() {
  const articles = allArticles.sort((a, b) => b.date.localeCompare(a.date));
  return (
    <>
      <Container className="mt-9">
        <div className="mx-auto grid max-w-xl grid-cols-1 gap-y-20 lg:max-w-none lg:grid-cols-[1fr,400px]">
          {/* Main Content (Left Side) */}
          <div className="space-y-20 mt-20">
            <div className="md:border-l md:border-zinc-100 md:pl-6 md:dark:border-zinc-700/40">
              <div className="flex flex-col space-y-16">
                {articles.map((article) => (
                  <Article key={article.slug} article={article} />
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar (Right Side) */}
          <div className="space-y-10 lg:pl-16 mt-20">
            {/* Bio Section */}
            <div>
              <p className="text-base text-zinc-600 dark:text-zinc-400">
                Sr. Principal Architect at Gojek. Working on scalable and reliable
                systems & abstractions for product engineering teams.
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
            </div>


            {/* Work History */}
            <Resume resume={resume} />

            {/* Categories Section */}
            <div>
              <h2 className="mb-4 text-sm font-semibold text-zinc-800 dark:text-zinc-100">
                Tags
              </h2>
              <div className="flex flex-wrap gap-2">
                {['XDB', 'ALS', 'Accessibility', 'Go'].map((category) => (
                  <span
                    key={category}
                    className="rounded-full bg-zinc-100 px-3 py-1 text-sm text-zinc-800 dark:bg-zinc-800 dark:text-zinc-100"
                  >
                    {category}
                  </span>
                ))}
              </div>
            </div>

            {/* Photos Section */}
            <Photos />
          </div>
        </div>
      </Container>
    </>
  );
}