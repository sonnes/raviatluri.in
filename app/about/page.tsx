import type { Metadata } from 'next';
import Image from 'next/image';

import { Container } from '@/components/container';
import { GitHubIcon, InstagramIcon, LinkedInIcon, TwitterIcon } from '@/components/icons';
import { SocialLink } from '@/components/links';
import Resume from '@/components/resume';
import portraitImage from '@/public/images/portrait.jpg';

export const metadata: Metadata = {
  title: 'About',
  description:
    'Senior Principal Architect at Gojek, building scalable systems and leading engineering teams. Living with ALS while continuing to innovate and mentor.',
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
                alt="Portrait of Ravi Atluri, Senior Principal Architect at Gojek"
                sizes="(min-width: 1024px) 32rem, 20rem"
                className="aspect-square rotate-3 rounded-2xl bg-zinc-100 object-cover shadow-lg"
              />
            </div>
          </div>
          <div className="lg:order-first lg:row-span-2">
            <h1 className="text-4xl font-bold tracking-tight text-zinc-800 sm:text-5xl">
              Ravi Atluri.
            </h1>
            <h2 className="text-2xl font-bold tracking-tight text-zinc-600 sm:text-2xl">
              Senior Principal Architect • Technical Leader • Problem Solver
            </h2>

            <div className="mt-8 space-y-7 text-base text-zinc-600 leading-relaxed">
              <div className="">
                <p className="text-lg font-medium text-zinc-800 mb-3">
                  Currently at Gojek, architecting scalable systems that serve millions of users
                  across Southeast Asia.
                </p>
                <p>
                  Leading product engineering teams to build reliable, high-performance distributed
                  systems.
                </p>
              </div>
              <div className="border-l-4 border-red-500 pl-4 bg-red-50/50 py-3 rounded-r">
                <p className="font-medium text-zinc-800 mb-2">Living with ALS since 2019</p>
                <p className="text-sm">
                  Continuing to innovate and lead while navigating this journey. My experience has
                  deepened my commitment to building accessible technology and mentoring the next
                  generation of engineers.{' '}
                  <a
                    href="https://twitter.com/sonnes/status/1474042833535262725"
                    target="_blank"
                    rel="noreferrer"
                    className="text-red-600 hover:text-red-700 font-medium underline transition-colors"
                  >
                    Read more about my story →
                  </a>
                </p>
              </div>

              <Resume />
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
