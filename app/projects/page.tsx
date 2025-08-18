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
  category: 'Open Source' | 'Personal Project' | 'Professional';
  technologies: string[];
  impact?: string;
  featured?: boolean;
};

const projects: Project[] = [
  {
    name: 'xkafka',
    description: 'HTTP-like abstractions for Apache Kafka in Go. Simplifies producing and consuming with familiar handlers and middleware patterns.',
    link: {
      href: 'https://github.com/gojekfarm/xtools/tree/main/xkafka',
      label: 'github.com/gojekfarm/xtools',
    },
    category: 'Open Source',
    technologies: ['Go', 'Apache Kafka', 'Microservices'],
    impact: 'Adopted across Gojek engineering teams',
    featured: true,
  },
  {
    name: 'xtools/errors',
    description: 'Enhanced error handling for Go applications with structured metadata and context propagation.',
    link: {
      href: 'https://github.com/gojekfarm/xtools/tree/main/errors',
      label: 'github.com/gojekfarm/xtools',
    },
    category: 'Open Source',
    technologies: ['Go', 'Error Handling', 'Observability'],
    impact: 'Used in production at scale',
    featured: true,
  },
  {
    name: 'xdb',
    description: 'Tuple-based database abstraction library enabling domain modeling across multiple database backends.',
    link: {
      href: 'https://github.com/sonnes/xdb',
      label: 'github.com/sonnes/xdb',
    },
    category: 'Open Source',
    technologies: ['Go', 'PostgreSQL', 'BadgerDB', 'Database Abstraction'],
    impact: 'Experimental - exploring new patterns',
  },
  {
    name: 'Life in Weeks',
    description: 'Personal data visualization showing major life events, career progression, and experiences over time.',
    link: {
      href: '/life',
      label: 'View Visualization',
    },
    category: 'Personal Project',
    technologies: ['Data Visualization', 'Personal Analytics'],
  },
];

export const metadata = {
  title: 'Projects',
  description: 'Open source libraries, development tools, and personal projects that solve real-world engineering challenges.',
};

export default function Projects() {
  return (
    <>
      <Container className="mt-8 sm:mt-16">
        <header className="max-w-4xl pb-10">
          <h1 className="text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100">{metadata.title}</h1>
          <p className="mt-6 text-lg text-zinc-600 dark:text-zinc-400">{metadata.description}</p>
          <div className="mt-8 flex flex-wrap gap-2">
            <span className="inline-flex items-center px-3 py-1 text-xs font-medium bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-300 rounded-full">
              Open Source Contributor
            </span>
            <span className="inline-flex items-center px-3 py-1 text-xs font-medium bg-zinc-50 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 rounded-full">
              Go Ecosystem
            </span>
            <span className="inline-flex items-center px-3 py-1 text-xs font-medium bg-zinc-50 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 rounded-full">
              Production Scale
            </span>
          </div>
        </header>

        <div className="space-y-16">
          {/* Featured Projects */}
          <div>
            <h2 className="text-xl font-semibold text-zinc-800 dark:text-zinc-100 mb-8">Featured Projects</h2>
            <ul role="list" className="grid grid-cols-1 gap-8 sm:grid-cols-2">
              {projects.filter(project => project.featured).map(project => (
                <Card as="li" key={project.name} className={project.featured ? 'ring-1 ring-red-200 dark:ring-red-800' : ''}>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      {project.featured && (
                        <div className="inline-flex items-center px-2 py-1 text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300 rounded mb-4">
                          Featured
                        </div>
                      )}
                      <h3 className="text-lg font-semibold text-zinc-800 dark:text-zinc-100">
                        <Card.Link href={project.link.href}>{project.name}</Card.Link>
                      </h3>
                      <div className="mt-1 inline-flex items-center px-2 py-1 text-xs bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 rounded">
                        {project.category}
                      </div>
                    </div>
                  </div>
                  
                  <Card.Description className="mt-4">{project.description}</Card.Description>
                  
                  <div className="mt-4 flex flex-wrap gap-1">
                    {project.technologies.map(tech => (
                      <span key={tech} className="inline-flex items-center px-2 py-1 text-xs bg-zinc-50 text-zinc-600 dark:bg-zinc-800/50 dark:text-zinc-400 rounded">
                        {tech}
                      </span>
                    ))}
                  </div>
                  
                  {project.impact && (
                    <div className="mt-3 text-sm text-green-600 dark:text-green-400 font-medium">
                      ✓ {project.impact}
                    </div>
                  )}
                  
                  <p className="relative z-10 mt-6 flex text-sm font-medium text-zinc-400 transition group-hover:text-red-500">
                    <LinkIcon className="h-5 w-5 flex-none" />
                    <span className="ml-2">{project.link.label}</span>
                  </p>
                </Card>
              ))}
            </ul>
          </div>
          
          {/* Other Projects */}
          <div>
            <h2 className="text-xl font-semibold text-zinc-800 dark:text-zinc-100 mb-8">Other Projects</h2>
            <ul role="list" className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {projects.filter(project => !project.featured).map(project => (
                <Card as="li" key={project.name}>
                  <h3 className="text-base font-semibold text-zinc-800 dark:text-zinc-100">
                    <Card.Link href={project.link.href}>{project.name}</Card.Link>
                  </h3>
                  <div className="mt-1 inline-flex items-center px-2 py-1 text-xs bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 rounded">
                    {project.category}
                  </div>
                  
                  <Card.Description className="mt-3">{project.description}</Card.Description>
                  
                  <div className="mt-3 flex flex-wrap gap-1">
                    {project.technologies.slice(0, 3).map(tech => (
                      <span key={tech} className="inline-flex items-center px-2 py-1 text-xs bg-zinc-50 text-zinc-600 dark:bg-zinc-800/50 dark:text-zinc-400 rounded">
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 3 && (
                      <span className="inline-flex items-center px-2 py-1 text-xs text-zinc-500 dark:text-zinc-400">
                        +{project.technologies.length - 3} more
                      </span>
                    )}
                  </div>
                  
                  {project.impact && (
                    <div className="mt-2 text-sm text-green-600 dark:text-green-400 font-medium">
                      ✓ {project.impact}
                    </div>
                  )}
                  
                  <p className="relative z-10 mt-4 flex text-sm font-medium text-zinc-400 transition group-hover:text-red-500">
                    <LinkIcon className="h-4 w-4 flex-none" />
                    <span className="ml-2">{project.link.label}</span>
                  </p>
                </Card>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </>
  );
}
