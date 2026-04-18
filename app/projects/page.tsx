import { Container } from '@/components/container';

type Project = {
  name: string;
  description: string;
  href: string;
  articleHref?: string;
};

type Category = {
  title: string;
  projects: Project[];
};

const categories: Category[] = [
  {
    title: 'Accessibility',
    projects: [
      {
        name: 'September',
        description:
          'A communication assistant for people with ALS, MND, or other speech and motor difficulties. Smart text editor, voice cloning, real-time transcription.',
        href: 'https://github.com/sonnes/september',
        articleHref: '/articles/building-september',
      },
      {
        name: 'macOS On-Screen Keyboard',
        description:
          'A custom on-screen keyboard for macOS with typing, voice, notes, and stories — all in one place.',
        href: '/articles/redesigning-macos-on-screen-keyboard',
      },
    ],
  },
  {
    title: 'Developer Tools',
    projects: [
      {
        name: 'XDB',
        description:
          'A database library based on tuples. Model your domain once, use it with any database.',
        href: 'https://github.com/xdb-dev/xdb',
        articleHref: '/articles/introducing-xdb',
      },
      {
        name: 'pi-go',
        description:
          'Provider-agnostic AI SDK for Go. Unified interface for building AI agents across LLM providers.',
        href: 'https://github.com/sonnes/pi-go',
      },
      {
        name: 'Chitragupt',
        description: 'Go CLI that converts Claude Code session logs into shareable transcripts.',
        href: 'https://github.com/sonnes/chitragupt',
      },
      {
        name: 'indexeddb-collection',
        description:
          'IndexedDB-backed collections for TanStack DB with cross-tab synchronization.',
        href: 'https://github.com/sonnes/indexeddb-collection',
      },
      {
        name: 'dctl',
        description: 'Docker Compose compatible CLI for Apple containers.',
        href: 'https://github.com/sonnes/dctl',
      },
    ],
  },
  {
    title: 'At Gojek',
    projects: [
      {
        name: 'XTools',
        description: 'Reusable Go libraries used across Gojek engineering teams.',
        href: 'https://github.com/gojekfarm/xtools',
      },
      {
        name: 'xkafka',
        description:
          'HTTP-like abstractions for Apache Kafka in Go. Simplifies producing and consuming with familiar handler and middleware patterns.',
        href: 'https://github.com/gojekfarm/xtools/tree/main/xkafka',
        articleHref: '/articles/introducing-xkafka',
      },
      {
        name: 'xapi',
        description:
          'Type-safe HTTP APIs in Go, middleware-friendly, built on standard library patterns.',
        href: 'https://github.com/gojekfarm/xtools/tree/main/xapi',
        articleHref: '/articles/introducing-xapi',
      },
    ],
  },
  {
    title: 'Fun Stuff',
    projects: [
      {
        name: 'Reader',
        description: 'Do you remember Google Reader?',
        href: 'https://github.com/sonnes/reader',
      },
      {
        name: 'Life in Weeks',
        description: 'A visualization of life events, career, and experiences over time.',
        href: '/life',
      },
    ],
  },
];

export const metadata = {
  title: 'Projects',
  description: 'Things I build — for myself, for work, and for fun.',
};

export default function Projects() {
  return (
    <Container className="mt-8 sm:mt-14">
      <header className="max-w-2xl">
        <h1 className="text-4xl font-bold tracking-tight text-primary sm:text-5xl">
          Projects
        </h1>
        <p className="mt-6 text-base text-text-secondary">
          Things I build — for myself, for work, and for fun.
        </p>
      </header>

      <div className="mt-16 space-y-16 sm:mt-20">
        {categories.map(category => (
          <section key={category.title}>
            <h2 className="text-lg font-semibold text-text-primary border-b border-border pb-3">
              {category.title}
            </h2>
            <ul className="mt-6 space-y-6">
              {category.projects.map(project => (
                <li key={project.name} className="border-l-2 border-border pl-4">
                  <a
                    href={project.href}
                    target={project.href.startsWith('/') ? undefined : '_blank'}
                    rel={project.href.startsWith('/') ? undefined : 'noreferrer'}
                    className="font-semibold text-text-primary hover:text-primary transition-colors"
                  >
                    {project.name}
                  </a>
                  <span className="text-text-secondary">
                    {' '}
                    — {project.description}
                  </span>
                  {project.articleHref && (
                    <>
                      {' '}
                      <a
                        href={project.articleHref}
                        className="text-primary hover:text-primary font-medium underline transition-colors text-sm"
                      >
                        Read more →
                      </a>
                    </>
                  )}
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </Container>
  );
}
