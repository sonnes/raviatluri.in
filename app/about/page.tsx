import type { Metadata } from 'next';
import Image from 'next/image';

import { Container } from '@/components/container';
import { GitHubIcon, InstagramIcon, LinkedInIcon, TwitterIcon } from '@/components/icons';
import { SocialLink } from '@/components/links';
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
        <div className="grid grid-cols-1 gap-y-16 lg:grid-cols-2 lg:gap-y-12">
          <div className="lg:pl-20 lg:sticky lg:top-32 lg:self-start">
            <div className="max-w-xs px-2.5 lg:max-w-none">
              <Image
                src={portraitImage}
                alt="Portrait of Ravi Atluri"
                sizes="(min-width: 1024px) 32rem, 20rem"
                className="aspect-square rotate-3 rounded-2xl bg-zinc-100 object-cover shadow-lg"
              />
            </div>
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
          <div className="lg:order-first lg:row-span-2">
            <h1 className="text-4xl font-bold tracking-tight text-text-primary sm:text-5xl">
              Ravi Atluri.
            </h1>

            <div className="mt-8 space-y-6 text-base text-text-secondary leading-relaxed">
              <p>
                I was diagnosed with{' '}
                <a
                  href="/articles/the-als-story"
                  className="text-primary hover:text-primary font-medium underline transition-colors"
                >
                  ALS in 2019
                </a>
                . Over time, I lost the ability to speak and type. I use a head-mounted mouse now.
              </p>

              <p>
                I still write code, architect systems, and break things at Gojek, where I work as a
                Senior Principal Architect. I{"'"}ve worked across GoFood, Merchant Platform, and
                Cartography teams. Before Gojek, I spent seven years at PaGaLGuY as Director of
                Engineering — where I rewrote pagalguy.com nine times.
              </p>

              <p>
                I{"'"}m currently{' '}
                <a
                  href="/articles/redesigning-macos-on-screen-keyboard"
                  className="text-primary hover:text-primary font-medium underline transition-colors"
                >
                  redesigning my on-screen keyboard
                </a>{' '}
                because I got bored of the default one. I know nothing about SwiftUI — doesn{"'"}t
                matter.
              </p>

              <p>
                We are living in incredible times where there are absolutely no barriers to building
                anything. If we can imagine it, AI can build it.
              </p>

              <h2 className="text-xl font-semibold text-text-primary pt-8 border-t border-border mt-2">
                What I{"'"}m building
              </h2>

              <ul className="space-y-5">
                <li className="border-l-2 border-border pl-4">
                  <a
                    href="https://github.com/sonnes/september"
                    target="_blank"
                    rel="noreferrer"
                    className="font-semibold text-text-primary hover:text-primary transition-colors"
                  >
                    September
                  </a>{' '}
                  — a communication assistant for people with ALS, MND, or other speech and motor
                  difficulties. Smart text editor, voice cloning, real-time transcription. Built
                  because I needed it.{' '}
                  <a
                    href="/articles/building-september"
                    className="text-primary hover:text-primary font-medium underline transition-colors"
                  >
                    Read more →
                  </a>
                </li>
                <li className="border-l-2 border-border pl-4">
                  <a
                    href="https://github.com/sonnes/pi-go"
                    target="_blank"
                    rel="noreferrer"
                    className="font-semibold text-text-primary hover:text-primary transition-colors"
                  >
                    pi-go
                  </a>{' '}
                  — provider-agnostic AI SDK for Go. Unified interface for building AI agents across
                  LLM providers.
                </li>
                <li className="border-l-2 border-border pl-4">
                  <a
                    href="https://github.com/xdb-dev/xdb"
                    target="_blank"
                    rel="noreferrer"
                    className="font-semibold text-text-primary hover:text-primary transition-colors"
                  >
                    XDB
                  </a>{' '}
                  — a database library based on tuples. Model your domain once, use it with any
                  database.{' '}
                  <a
                    href="/articles/introducing-xdb"
                    className="text-primary hover:text-primary font-medium underline transition-colors"
                  >
                    Read more →
                  </a>
                </li>
                <li className="border-l-2 border-border pl-4">
                  <a
                    href="https://github.com/sonnes/chitragupt"
                    target="_blank"
                    rel="noreferrer"
                    className="font-semibold text-text-primary hover:text-primary transition-colors"
                  >
                    Chitragupt
                  </a>{' '}
                  — Go CLI that converts Claude Code session logs into shareable transcripts.
                </li>
                <li className="border-l-2 border-border pl-4">
                  <a
                    href="https://github.com/gojekfarm/xtools"
                    target="_blank"
                    rel="noreferrer"
                    className="font-semibold text-text-primary hover:text-primary transition-colors"
                  >
                    XTools
                  </a>{' '}
                  — reusable Go libraries, built at Gojek.
                </li>
              </ul>

              <h2 className="text-xl font-semibold text-text-primary pt-8 border-t border-border mt-2">
                What I believe
              </h2>

              <ul className="space-y-3">
                <li>
                  Career growth isn{"'"}t about picking IC vs manager.{' '}
                  <a
                    href="/articles/career-growth"
                    className="text-primary hover:text-primary font-medium underline transition-colors"
                  >
                    It{"'"}s about expanding in three dimensions.
                  </a>
                </li>
                <li>
                  The best tools are the ones you build for yourself, then realize others need them
                  too.
                </li>
                <li>
                  Good abstractions make hard things easy — whether it{"'"}s talking to databases or
                  talking to my son.
                </li>
              </ul>

              <p className="text-text-secondary text-sm border-t border-border pt-2">
                I <s>speak</s> type English, Hindi, and Telugu. I live in Hyderabad with my wife and
                son — who has figured out that my slow typing speed is an exploitable vulnerability.
              </p>

              <p className="text-text-secondary text-sm">
                {'"'}sonnes{'"'} is German for my name. When Google Translate launched, the first
                thing I did was look up Ravi Kiran. It spat out {'"'}Sonnenstrahlen{'"'} — sun rays.
                I{"'"}ve been sonnes ever since.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}
