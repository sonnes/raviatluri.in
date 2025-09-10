import { Card } from '@/components/card';
import { Container } from '@/components/container';

export const metadata = {
  title: 'Tools',
  description: "Tech I'm currently using for writing, coding and photo editing.",
};

function ToolsSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="md:border-l md:border-border md:pl-6">
      <div className="grid max-w-3xl grid-cols-1 items-baseline gap-y-8 md:grid-cols-4">
        <h2 className="text-sm font-semibold text-text-primary">{title}</h2>
        <div className="md:col-span-3">
          <ul role="list" className="space-y-16">
            {children}
          </ul>
        </div>
      </div>
    </section>
  );
}

function Tool({
  title,
  href,
  children,
}: {
  title: string;
  href?: string;
  children: React.ReactNode;
}) {
  return (
    <Card as="li" className="group relative flex flex-col items-start">
      <div className="absolute -inset-x-4 -inset-y-6 z-0 scale-95 bg-surface-50 opacity-0 transition group-hover:scale-100 group-hover:opacity-100 sm:-inset-x-6 sm:rounded-2xl" />
      <div className="relative z-10">
        <Card.Title as="h3" href={href}>
          {title}
        </Card.Title>
        <Card.Description>{children}</Card.Description>
      </div>
    </Card>
  );
}

export default function Uses() {
  return (
    <>
      <Container className="mt-8 sm:mt-16">
        <header className="max-w-3xl pb-10">
          <h1 className="text-4xl font-bold tracking-tight text-text-primary">{metadata.title}</h1>
          <p className="mt-6 text-lg text-text-secondary">{metadata.description}</p>
        </header>
        <div className="space-y-20">
          <ToolsSection title="Workstation">
            <Tool title="Mac Mini, M2 Pro, 32GB RAM (2023)">
              This is my primary workstation. I use it for everything from writing code to editing
              photos. It is a beast.
            </Tool>
            <Tool title='15" MacBook Pro, 16GB RAM (2018)'>
              This was a standard issue work laptop at Gojek. I use it when I am away from my home
              office.
            </Tool>
            <Tool title="Logitech MX Master 3S">This has been my go-to mouse for years.</Tool>
          </ToolsSection>
          <ToolsSection title="Development Tools">
            <Tool title="VS Code">
              The workhorse of my writing and coding work. Have been using it every day for the past
              5 years.
            </Tool>
            <Tool title="iTerm2 + zsh + oh-my-zsh">For all of my terminal work.</Tool>
          </ToolsSection>
        </div>
      </Container>
    </>
  );
}
