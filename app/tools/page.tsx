import { Card } from '@/components/card';
import { Container } from '@/components/container';

export const metadata = {
  title: 'Tools',
  description: 'Hardware, software, and accessibility tools I use every day.',
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
    <Container className="mt-8 sm:mt-14">
      <header className="max-w-2xl">
        <h1 className="text-4xl font-bold tracking-tight text-primary sm:text-5xl">Tools</h1>
        <p className="mt-6 text-base text-text-secondary">
          Hardware, software, and accessibility tools I use every day. Every click takes 0.8
          seconds, so I{"'"}ve gotten picky about what{"'"}s worth clicking.
        </p>
      </header>
      <div className="mt-16 space-y-20 sm:mt-20">
        <ToolsSection title="Accessibility">
          <Tool title="Head-mounted mouse" href="https://glassouse.com/">
            Tracks head movement to control the cursor. This replaced my Logitech MX Master 3S when
            my hands could no longer operate a traditional mouse. Every click is a dwell click —
            hold the cursor still for 0.8 seconds.
          </Tool>
          <Tool title="Custom on-screen keyboard">
            Started with the macOS Accessibility Keyboard, added shortcuts, passwords, emails, and
            frequently used phrases over time. Currently redesigning it from scratch in SwiftUI to
            combine typing, voice, notes, and stories in one place.
          </Tool>
          <Tool title="September" href="https://september.to">
            My communication assistant. Smart text editor that learns how I talk, voice cloning via
            ElevenLabs, real-time transcription, and multiple keyboard layouts optimized for
            head-mouse input. Built it because nothing else existed.
          </Tool>
          <Tool title="ElevenLabs" href="https://elevenlabs.io/">
            Voice cloning. My speech was already slurred by the time this launched, so I dug through
            old hard drives and videos to find recordings of my original voice.
          </Tool>
        </ToolsSection>
        <ToolsSection title="Development">
          <Tool title="VS Code">
            The workhorse. Everything happens here — code, articles, emails, long messages. I write
            everything in VS Code and copy-paste to wherever it needs to go.
          </Tool>
          <Tool title="Claude Code" href="https://claude.ai/code">
            My partner-in-getting-shit-done. I knew nothing about SwiftUI and still redesigned my
            keyboard. Claude writes the code, I make the decisions.
          </Tool>
          <Tool title="Cursor" href="https://cursor.com/">
            Between Cursor and Claude Code, most of my coding is now describing what I want and
            reviewing what comes back.
          </Tool>
          <Tool title="GitHub Copilot" href="https://copilot.github.com/">
            The original game-changer. Smart text suggestions that learn from your writing made it
            possible for me to keep coding when typing became painful. I use it for code and prose
            alike.
          </Tool>
          <Tool title="iTerm2 + zsh + oh-my-zsh">
            For all terminal work. Some things are still faster in a terminal, even at 0.8 seconds
            per click.
          </Tool>
        </ToolsSection>
        <ToolsSection title="Hardware">
          <Tool title="Mac Mini, M2 Pro, 32GB RAM (2023)">
            Primary workstation. Handles everything from builds to video calls without breaking a
            sweat.
          </Tool>
          <Tool title='15" MacBook Pro, 16GB RAM (2018)'>
            Standard issue Gojek laptop. Used when away from my home office.
          </Tool>
        </ToolsSection>
      </div>
    </Container>
  );
}
