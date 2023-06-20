import type { Metadata } from 'next';

import { Card } from '@/components/card';
import { Section } from '@/components/section';
import { SimpleLayout } from '@/components/simple_layout';

export const metadata: Metadata = {
  title: 'Tools',
  description:
    "Tech I'm currently using for writing, coding and photo editing.",
};

function ToolsSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <Section title={title}>
      <ul role="list" className="space-y-16">
        {children}
      </ul>
    </Section>
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
    <Card as="li">
      <Card.Title as="h3" href={href}>
        {title}
      </Card.Title>
      <Card.Description>{children}</Card.Description>
    </Card>
  );
}

export default function Uses() {
  return (
    <>
      <SimpleLayout
        title="Tools"
        intro="Tech I'm currently using for writing, coding and photo editing."
      >
        <div className="space-y-20">
          <ToolsSection title="Workstation">
            <Tool title="Mac Mini, M2 Pro, 32GB RAM (2023)">
              This is my primary workstation. I use it for everything from
              writing code to editing photos. It's a beast.
            </Tool>
            <Tool title="15” MacBook Pro, 16GB RAM (2018)">
              This was a standard issue work laptop at Gojek. I use it when I'm
              away from my home office.
            </Tool>
            <Tool title="Logitech MX Master 2S">
              This has been my go-to mouse for years.
            </Tool>
          </ToolsSection>
          <ToolsSection title="Development Tools">
            <Tool title="VS Code">
              The workhorse of my writing and coding work. Have been using it
              every day for the past 5 years.
            </Tool>
            <Tool title="iTerm2 + zsh + oh-my-zsh">
              For all of my terminal work.
            </Tool>
          </ToolsSection>
        </div>
      </SimpleLayout>
    </>
  );
}
