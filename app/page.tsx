import Image from 'next/image';

import { Container } from '@/components/container';
import { GitHubIcon, InstagramIcon, LinkedInIcon, TwitterIcon } from '@/components/icons';
import { SocialLink } from '@/components/links';
import Photos from '@/components/photos';
import Resume from '@/components/resume';

export default async function Home() {
  return (
    <>
      <Container className="mt-9">
        <div className="mx-auto grid max-w-xl grid-cols-1 gap-y-20 lg:max-w-none lg:grid-cols-[1fr,400px]">
          {/* Main Content (Left Side) */}
          <div className="space-y-20 mt-20">
            <div className="md:border-l md:border-zinc-100 md:pl-6 md:dark:border-zinc-700/40">
              <div className="flex flex-col space-y-16"></div>
            </div>
          </div>

          {/* Sidebar (Right Side) */}
          <div className="space-y-10 lg:pl-16 mt-20">
            {/* Bio Section */}
            <div>
              <p className="text-lg text-zinc-600 dark:text-zinc-400">
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
            </div>

            {/* Work History */}
            <Resume />

            {/* Categories Section */}
            <div className="border-b border-zinc-100 dark:border-zinc-700/40 pb-4">
              <h2 className="mb-4 text-lg font-medium text-zinc-800 dark:text-zinc-100">Tags</h2>
              <div className="flex flex-wrap gap-2">
                {['XDB', 'ALS', 'Accessibility', 'Go'].map(category => (
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
