import Image from 'next/image';

import type { Metadata } from 'next';

import { Container } from '@/components/container';
import {
  GitHubIcon,
  InstagramIcon,
  LinkedInIcon,
  TwitterIcon,
} from '@/components/icons';
import { SocialLink } from '@/components/links';
import portraitImage from '@/public/images/portrait.jpg';

export const metadata: Metadata = {
  title: 'About',
  description: 'Engineering at Gojek.',
};

export default function About() {
  return (
    <>
      <Container className="mt-16 sm:mt-32">
        <div className="grid grid-cols-1 gap-y-16 lg:grid-cols-2 lg:grid-rows-[auto_1fr] lg:gap-y-12">
          <div className="lg:pl-20">
            <div className="max-w-xs px-2.5 lg:max-w-none">
              <Image
                src={portraitImage}
                alt=""
                sizes="(min-width: 1024px) 32rem, 20rem"
                className="aspect-square rotate-3 rounded-2xl bg-zinc-100 object-cover dark:bg-zinc-800"
              />
            </div>
          </div>
          <div className="lg:order-first lg:row-span-2">
            <h1 className="text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">
              Ravi Atluri.
            </h1>
            <h2 className="text-2xl font-bold tracking-tight text-zinc-600 dark:text-zinc-200 sm:text-2xl">
              Engineering at Gojek. Living with ALS.
            </h2>
            <div className="mt-6 space-y-7 text-base text-zinc-600 dark:text-zinc-400">
              <p>
                I&apos;m Ravi, a Senior Principal Architect at Gojek, where I
                work on building scalable and reliable systems & abstractions
                for the product engineering teams. I have been{' '}
                <a
                  href="https://twitter.com/sonnes/status/1474042833535262725"
                  target="_blank"
                  rel="noreferrer"
                  className="text-red-500 transition hover:text-red-800 dark:text-red-500 dark:hover:text-red-300"
                >
                  living with ALS since 2019.
                </a>
              </p>
            </div>
          </div>
          <div className="mt-6 flex gap-6 lg:pl-20">
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
    </>
  );
}
