import { Container } from '@/components/container';

export function SimpleLayout({
  title,
  intro,
  children,
}: {
  title: string;
  intro?: string;
  children: React.ReactNode;
}): JSX.Element {
  return (
    <Container className="mt-16 sm:mt-32">
      <header className="max-w-3xl mb-10 border-b border-zinc-200 dark:border-zinc-800 pb-10">
        <h1 className="text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100">
          {title}
        </h1>
        {intro && (
          <p className="mt-6 text-lg text-zinc-600 dark:text-zinc-400">
            {intro}
          </p>
        )}
      </header>
      <div className="mt-8 sm:mt-6">{children}</div>
    </Container>
  );
}
