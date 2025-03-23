import Image from 'next/image';

import { Card } from '@/components/card';
import { Container } from '@/components/container';
import { LinkIcon } from '@/components/icons';

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
  {
    name: 'Life in Weeks',
    description: 'An aggregation of my work, major life events etc. visualized in weeks.',
    link: {
      href: '/life',
      label: 'Life in Weeks',
    },
  },
];

export const metadata = {
  title: 'Projects',
  description: "Things I've built, including open-source projects, side projects, and more.",
};

export default function Projects() {
  return (
    <>
      <Container className="mt-8 sm:mt-16">
        <header className="max-w-3xl pb-10">
          <h1 className="text-4xl font-bold tracking-tight text-zinc-800">{metadata.title}</h1>
          <p className="mt-6 text-lg text-zinc-600">{metadata.description}</p>
        </header>

        <ul
          role="list"
          className="grid grid-cols-1 gap-x-12 gap-y-16 sm:grid-cols-2 lg:grid-cols-3"
        >
          {projects.map(project => (
            <Card as="li" key={project.name}>
              {project.logo && (
                <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-md shadow-zinc-800/5 ring-1 ring-zinc-900/5">
                  <Image src={project.logo} alt="" className="h-8 w-8" unoptimized />
                </div>
              )}
              <h2 className="mt-6 text-base font-semibold text-zinc-800">
                <Card.Link href={project.link.href}>{project.name}</Card.Link>
              </h2>
              <Card.Description>{project.description}</Card.Description>
              <p className="relative z-10 mt-6 flex text-sm font-medium text-zinc-400 transition group-hover:text-red-500">
                <LinkIcon className="h-6 w-6 flex-none" />
                <span className="ml-2">{project.link.label}</span>
              </p>
            </Card>
          ))}
        </ul>
      </Container>
    </>
  );
}
