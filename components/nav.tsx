'use client';

import { Fragment } from 'react';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import {
  Popover,
  PopoverBackdrop,
  PopoverButton,
  PopoverPanel,
  Transition,
  TransitionChild,
} from '@headlessui/react';
import { ChevronDownIcon, XMarkIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';

import navigation from '@/content/navigation';

function NavItem({ href, children }: { href: string; children: React.ReactNode }) {
  const isActive = usePathname().startsWith(href);

  return (
    <li>
      <Link
        href={href}
        className={clsx(
          'relative block px-3 py-2 transition-all duration-200 rounded-full font-medium focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2',
          isActive 
            ? 'text-red-500 dark:text-red-400 bg-red-50 dark:bg-red-900/20' 
            : 'hover:text-red-500 dark:hover:text-red-400 hover:bg-red-50/50 dark:hover:bg-red-900/10'
        )}
      >
        {children}
        {isActive && (
          <span className="absolute inset-x-2 -bottom-px h-px bg-gradient-to-r from-red-500/0 via-red-500/60 to-red-500/0 dark:from-red-400/0 dark:via-red-400/60 dark:to-red-400/0" />
        )}
      </Link>
    </li>
  );
}

export default function Navigation() {
  return (
    <>
      <MobileNavigation className="md:hidden" />
      <DesktopNavigation className="hidden md:block" />
    </>
  );
}

export function DesktopNavigation({ className }: { className?: string }) {
  return (
    <nav className={className}>
      <ul className="flex rounded-full bg-white/90 px-3 text-sm font-medium text-zinc-800 shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur dark:bg-zinc-800/90 dark:text-zinc-200 dark:ring-white/10">
        {navigation.map(({ href, name }, index) => (
          <NavItem key={index} href={href}>
            {name}
          </NavItem>
        ))}
      </ul>
    </nav>
  );
}

function MobileNavItem({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <li>
      <PopoverButton 
        as={Link} 
        href={href} 
        className="block py-4 px-2 min-h-[44px] text-base transition-colors duration-200 hover:text-red-500 dark:hover:text-red-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 dark:focus:ring-offset-zinc-900 rounded-md"
      >
        {children}
      </PopoverButton>
    </li>
  );
}

export function MobileNavigation({ className }: { className?: string }) {
  return (
    <Popover className={className}>
      <PopoverButton className="group flex items-center rounded-full bg-white/90 px-4 py-2 min-h-[44px] text-sm font-medium text-zinc-800 shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur dark:bg-zinc-800/90 dark:text-zinc-200 dark:ring-white/10 dark:hover:ring-white/20 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2">
        Menu
        <ChevronDownIcon className="ml-3 h-auto w-2 stroke-zinc-500 group-hover:stroke-zinc-700 dark:group-hover:stroke-zinc-400" />
      </PopoverButton>
      <Transition>
        <TransitionChild
          as={Fragment}
          enter="duration-150 ease-out"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="duration-150 ease-in"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <PopoverBackdrop className="fixed inset-0 z-50 bg-zinc-800/40 backdrop-blur-sm dark:bg-black/80" />
        </TransitionChild>

        <TransitionChild
          as={Fragment}
          enter="duration-150 ease-out"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="duration-150 ease-in"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <PopoverPanel
            focus
            className="fixed inset-x-4 top-8 z-50 origin-top rounded-3xl bg-white p-8 ring-1 ring-zinc-900/5 dark:bg-zinc-900 dark:ring-zinc-800"
          >
            <div className="flex flex-row-reverse items-center justify-between">
              <PopoverButton aria-label="Close menu" className="-m-1 p-2 min-h-[44px] min-w-[44px] rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 dark:focus:ring-offset-zinc-900 transition-colors duration-200 hover:bg-zinc-100 dark:hover:bg-zinc-800">
                <XMarkIcon className="h-6 w-6 text-zinc-500 dark:text-zinc-400" />
              </PopoverButton>

              <h2 className="text-sm font-medium text-zinc-600 dark:text-zinc-400">Navigation</h2>
            </div>

            <nav className="mt-6">
              <ul className="-my-1 divide-y divide-zinc-100 text-base text-zinc-800 dark:divide-zinc-100/5 dark:text-zinc-300">
                {navigation.map(({ href, name }, index) => (
                  <MobileNavItem key={index} href={href}>
                    {name}
                  </MobileNavItem>
                ))}
              </ul>
            </nav>
          </PopoverPanel>
        </TransitionChild>
      </Transition>
    </Popover>
  );
}
