import Link from 'next/link';

import clsx from 'clsx';

import Avatar from '@/components/avatar';

import { Container } from './container';
import Navigation from './nav';

function AvatarContainer({ className, ...props }: { className?: string; [key: string]: any }) {
  return (
    <div
      className={clsx(
        className,
        'h-10 w-10 rounded-full bg-white/90 p-0.5 shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur dark:bg-zinc-800/90 dark:ring-white/10'
      )}
      {...props}
    />
  );
}

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full">
      <div className="relative pt-6 z-10 bg-white/75 backdrop-blur-sm dark:bg-zinc-900/75">
        <Container className="py-4">
          <div className="relative flex items-center justify-between md:grid md:grid-cols-3">
            <div className="flex items-center">
              <AvatarContainer>
                <Avatar />
              </AvatarContainer>
              {/* <div className="ml-4">
                <span className="text-2xl font-bold bg-gradient-to-br from-zinc-500 to-zinc-800 dark:from-zinc-100 dark:to-zinc-500 text-transparent bg-clip-text">
                  Ravi Atluri
                </span>
              </div> */}
            </div>
            <div className="flex justify-end md:justify-center">
              <Navigation />
            </div>
            {/* Empty div for grid balance */}
            <div className="hidden md:block" />
          </div>
        </Container>
      </div>
    </header>
  );
}
