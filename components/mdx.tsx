import React, { ComponentPropsWithoutRef } from 'react';

import { MDXRemote, MDXRemoteProps } from 'next-mdx-remote/rsc';
import Image from 'next/image';
import Link from 'next/link';

import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

type HeadingProps = ComponentPropsWithoutRef<'h1'>;
type ParagraphProps = ComponentPropsWithoutRef<'p'>;
type ListProps = ComponentPropsWithoutRef<'ul'>;
type ListItemProps = ComponentPropsWithoutRef<'li'>;
type AnchorProps = ComponentPropsWithoutRef<'a'>;
type BlockquoteProps = ComponentPropsWithoutRef<'blockquote'>;

const customComponents = {
  h1: (props: HeadingProps) => <h1 className="text-2xl font-semibold mt-12 mb-3" {...props} />,
  h2: (props: HeadingProps) => <h2 className="text-xl font-semibold mt-8 mb-3" {...props} />,
  h3: (props: HeadingProps) => <h3 className="text-lg font-semibold mt-6 mb-3" {...props} />,
  h4: (props: HeadingProps) => <h4 className="text-base font-semibold mb-3" {...props} />,
  p: (props: ParagraphProps) => <p className="leading-snug my-4" {...props} />,
  ol: (props: ListProps) => <ol className="list-decimal pl-5 space-y-2" {...props} />,
  ul: (props: ListProps) => <ul className="list-disc pl-5 space-y-1" {...props} />,
  li: (props: ListItemProps) => <li className="pl-1" {...props} />,
  em: (props: ComponentPropsWithoutRef<'em'>) => <em className="" {...props} />,
  strong: (props: ComponentPropsWithoutRef<'strong'>) => (
    <strong className="font-semibold" {...props} />
  ),
  a: ({ href, children, ...props }: AnchorProps) => {
    const className = 'text-red-500 hover:text-red-700 dark:underline';
    if (href?.startsWith('/')) {
      return (
        <Link href={href} className={className} {...props}>
          {children}
        </Link>
      );
    }
    if (href?.startsWith('#')) {
      return (
        <a href={href} className={className} {...props}>
          {children}
        </a>
      );
    }
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={className} {...props}>
        {children}
      </a>
    );
  },
  code: ({ children, className, style, ...props }: ComponentPropsWithoutRef<'code'>) => {
    const language = className?.replace('language-', '');
    // Inline code: no className
    if (!className) {
      return (
        <code
          className="bg-zinc-100 dark:bg-zinc-800 rounded px-1.5 py-0.5 font-mono text-[0.90em]"
          {...props}
        >
          {children}
        </code>
      );
    }
    // Code block
    const customStyle = style || {
      margin: '1.5rem 0',
      padding: '1rem',
      borderRadius: '0.5rem',
      fontSize: '0.875rem',
      lineHeight: '1.5',
    };
    return (
      <SyntaxHighlighter
        language={language}
        style={vscDarkPlus}
        customStyle={customStyle}
        {...props}
      >
        {String(children).replace(/\n$/, '')}
      </SyntaxHighlighter>
    );
  },
  Table: ({ data }: { data: { headers: string[]; rows: string[][] } }) => (
    <table>
      <thead>
        <tr>
          {data.headers.map((header, index) => (
            <th key={index}>{header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.rows.map((row, index) => (
          <tr key={index}>
            {row.map((cell, cellIndex) => (
              <td key={cellIndex}>{cell}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  ),
  blockquote: (props: BlockquoteProps) => (
    <blockquote
      className="ml-[0.075em] border-l-3 border-gray-300 pl-4 text-gray-700 dark:border-zinc-600 dark:text-zinc-300"
      {...props}
    />
  ),
  img: (props: ComponentPropsWithoutRef<'img'>) => {
    const { width = 800, height = 600, alt = '', src, ...rest } = props;
    if (!src) return null;
    return (
      <Image
        src={src}
        width={Number(width)}
        height={Number(height)}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        className="rounded-lg"
        alt={alt}
        {...rest}
      />
    );
  },
  Image: (props: React.ComponentProps<typeof Image>) => {
    const { alt = '', src, ...rest } = props;
    if (!src) return null;
    return (
      <div className="grid grid-cols-1 justify-items-center mt-4 mb-8">
        <div>
          <Image
            src={src}
            width={800}
            height={600}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="rounded-lg shadow-sm"
            alt={alt}
            {...rest}
          />
        </div>
        <div className="mt-2 text-xs italic text-gray-800">{props.alt}</div>
      </div>
    );
  },
  Video: (props: ComponentPropsWithoutRef<'video'> & { alt: string }) => {
    const { alt = '', src, ...rest } = props;
    if (!src) return null;
    return (
      <div className="grid grid-cols-1 justify-items-center mt-4 mb-8">
        <video className="rounded-lg" src={src} {...rest} />
        <div className="text-xs italic text-gray-800">{alt}</div>
      </div>
    );
  },
};

export function CustomMDX(props: MDXRemoteProps) {
  return <MDXRemote {...props} components={customComponents} />;
}

export function getMDXComponents() {
  return customComponents;
}
