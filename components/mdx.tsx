import * as React from 'react';

import Image from 'next/image';
import Link from 'next/link';

import { useMDXComponent } from 'next-contentlayer/hooks';

function RoundedImage({ alt, ...props }: React.ComponentProps<typeof Image>) {
  return (
    <Image
      alt={alt}
      width={800}
      height={600}
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      className="rounded-lg"
      {...props}
    />
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
const components = {
  Image: RoundedImage,
  //a: Link,
  Callout,
};

interface MDXProps {
  code: string;
}

export function MDX({ code }: MDXProps) {
  const Component = useMDXComponent(code);

  return (
    <article className="prose-quoteless prose-neutral prose dark:prose-invert">
      <Component components={components} />
    </article>
  );
}
