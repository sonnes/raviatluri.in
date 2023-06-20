import Head from 'next/head';
import Image from 'next/image';

import type { Metadata } from 'next';

import { Card } from '@/components/card';
import { LinkIcon } from '@/components/icons';
import { SimpleLayout } from '@/components/simple_layout';

type Project = {
  name: string;
  description: string;
  link: {
    href: string;
    label: string;
  };
  logo?: string;
};

const projects: Project[] = [
  {
    name: 'xdb',
    description:
      'Database agnostic data abstraction & toolkit for Go. Supports PostgreSQL, BadgerDB, and more.',
    link: {
      href: 'https://github.com/sonnes/xdb',
      label: 'github.com/sonnes/xdb',
    },
  },
];
export const metadata: Metadata = {
  title: 'Projects',
  description:
    "Things I've built, including open-source projects, side projects, and more.",
};

export default function Projects() {
  return (
    <>
      <Head>
        <title>Projects - Ravi Atluri</title>
        <meta
          name="description"
          content="Things I've built, including open-source projects, side projects, and more."
        />
      </Head>
      <SimpleLayout
        title="Projects"
        intro="Things I've built, including open-source projects, side projects, and more."
      >
        <ul
          role="list"
          className="grid grid-cols-1 gap-x-12 gap-y-16 sm:grid-cols-2 lg:grid-cols-3"
        >
          {projects.map((project) => (
            <Card as="li" key={project.name}>
              {project.logo && (
                <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-md shadow-zinc-800/5 ring-1 ring-zinc-900/5 dark:border dark:border-zinc-700/50 dark:bg-zinc-800 dark:ring-0">
                  <Image
                    src={project.logo}
                    alt=""
                    className="h-8 w-8"
                    unoptimized
                  />
                </div>
              )}
              <h2 className="mt-6 text-base font-semibold text-zinc-800 dark:text-zinc-100">
                <Card.Link href={project.link.href}>{project.name}</Card.Link>
              </h2>
              <Card.Description>{project.description}</Card.Description>
              <p className="relative z-10 mt-6 flex text-sm font-medium text-zinc-400 transition group-hover:text-red-500 dark:text-zinc-200">
                <LinkIcon className="h-6 w-6 flex-none" />
                <span className="ml-2">{project.link.label}</span>
              </p>
            </Card>
          ))}
        </ul>
      </SimpleLayout>
    </>
  );
}
