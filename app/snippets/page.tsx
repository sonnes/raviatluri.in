import Link from 'next/link';

import type { Snippet } from 'contentlayer/generated';
import { allSnippets } from 'contentlayer/generated';
import type { Metadata } from 'next';

import { MDX } from '@/components/mdx';
import { SimpleLayout } from '@/components/simple_layout';

export const metadata: Metadata = {
  title: 'Snippets',
  description: 'Useful snippets of code from my day-to-day work.',
};

const SnippetCard = ({ snippet }: { snippet: Snippet }) => (
  <article>
    <Link href={snippet.slug}>
      <h3 className="text-2xl font-bold cursor-pointer hover:text-red-500 dark:hover:text-red-400">
        {snippet.title}
      </h3>
    </Link>
    <p className="text-gray-500 dark:text-gray-400">
      <MDX code={snippet.body.code} />
    </p>
  </article>
);

export default function SnippetsIndex() {
  const snippets = allSnippets.sort((a, b) => b.date.localeCompare(a.date));

  return (
    <>
      <SimpleLayout
        title="Snippets"
        intro="Useful snippets of code from my day-to-day work."
      >
        <div className="">
          <div className="flex max-w-3xl flex-col space-y-16">
            {snippets.map((snippet) => (
              <SnippetCard key={snippet.slug} snippet={snippet} />
            ))}
          </div>
        </div>
      </SimpleLayout>
    </>
  );
}
