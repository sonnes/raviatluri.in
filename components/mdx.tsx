import * as React from 'react';

import Image from 'next/image';
import Link from 'next/link';

import type { MDXComponents } from 'mdx/types';
import { useMDXComponent } from 'next-contentlayer/hooks';

function RoundedImage({ alt, ...props }: React.ComponentProps<typeof Image>) {
  return (
    <div className="grid grid-cols-1 justify-items-center">
      <div>
        <Image
          alt={alt}
          width={800}
          height={600}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="rounded-lg"
          {...props}
        />
      </div>
      <div className="text-xs italic text-gray-800">{alt}</div>
    </div>
  );
}

function Callout({
  emoji,
  children,
}: {
  emoji: string;
  children: React.ReactNode;
}) {
  return (
    <div className="my-8 flex rounded-lg border border-neutral-200 bg-neutral-100 p-4 dark:border-neutral-800 dark:bg-neutral-900">
      <div className="mr-4 flex w-4 items-center">{emoji}</div>
      <div className="callout w-full">{children}</div>
    </div>
  );
}

function ALink({
  href,
  children,
}: {
  href?: string;
  children?: React.ReactNode;
}) {
  return <Link href={href || ''}>{children}</Link>;
}

function H1({ children }: { children?: React.ReactNode }) {
  return <h1 className="text-2xl font-bold">{children}</h1>;
}

function H2({ children }: { children?: React.ReactNode }) {
  return <h2 className="text-lg font-bold">{children}</h2>;
}

function H3({ children }: { children?: React.ReactNode }) {
  return <h3 className="font-bold">{children}</h3>;
}

const components: MDXComponents = {
  Image: RoundedImage,
  a: ALink,
  h1: H1,
  h2: H2,
  h3: H3,
  Callout,
};

interface MDXProps {
  code: string;
}

export function MDX({ code }: MDXProps) {
  const Component = useMDXComponent(code);

  return (
    <article className="text-lg prose dark:prose-invert">
      <Component components={components} />
    </article>
  );
}
