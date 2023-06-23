import Image from 'next/image';
import Link from 'next/link';

import clsx from 'clsx';
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
import image1 from '@/public/images/photos/image-1.jpg';
import image2 from '@/public/images/photos/image-2.jpg';
import image3 from '@/public/images/photos/image-3.jpg';
import image4 from '@/public/images/photos/image-4.jpg';
import image5 from '@/public/images/photos/image-5.jpg';
import { Card } from '@/components/card';
import type { Article } from 'contentlayer/generated';
import { formatDate } from '@/lib/formatDate';

const resume: Experience[] = [
  {
    company: 'Gojek',
    title: 'Senior Engineering Manager',
    logo: logoGojek,
    start: '2019',
    current: true,
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
  let rotations = [
    'rotate-2',
    '-rotate-2',
    'rotate-2',
    'rotate-2',
    '-rotate-2',
  ];

  return (
    <div className="mt-16 sm:mt-20">
      <div className="-my-4 flex justify-center gap-5 overflow-hidden py-4 sm:gap-8">
        {[image1, image2, image3, image4, image5].map((image, imageIndex) => (
          <div
            key={image.src}
            className={clsx(
              'relative aspect-[9/10] w-44 flex-none overflow-hidden rounded-xl bg-zinc-100 dark:bg-zinc-800 sm:w-72 sm:rounded-2xl',
              rotations[imageIndex % rotations.length]
            )}
          >
            <Image
              src={image}
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

function Article({ article }: { article: Article }  ) {
  return (
    <Card as="article">
      <Card.Title href={article.slug}>
        {article.title}
      </Card.Title>
      <Card.Eyebrow as="time" dateTime={article.date} decorate>
        {formatDate(article.date)}
      </Card.Eyebrow>
      <Card.Description>{article.description}</Card.Description>
      <Card.Cta>Read</Card.Cta>
    </Card>
  );
}

export default async function Home() {
  const articles = allArticles.sort((a, b) => b.date.localeCompare(a.date)).slice(0, 3);

  return (
    <>
      <Container className="mt-9">
        <div className="max-w-2xl">
          {
            <h1 className="text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">
              Ravi Atluri.
            </h1>
          }
          <p className="mt-6 text-base text-zinc-600 dark:text-zinc-400">
            Product Engineer at GoFood, Gojek. Working scalable and reliable
            systems & abstractions for product engineering teams. Living with
            ALS since 2019.
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
      </Container>
      <Photos />
      <Container className="mt-24 md:mt-28">
        <div className="mx-auto grid max-w-xl grid-cols-1 gap-y-20 lg:max-w-none lg:grid-cols-2">
          <div className="flex flex-col gap-16">
            {articles.map((article) => (
              <Article key={article.slug} article={article} />
            ))}
          </div>
          <div className="space-y-10 lg:pl-16 xl:pl-24">
            <Resume resume={resume} />
          </div>
        </div>
      </Container>
    </>
  );
}
