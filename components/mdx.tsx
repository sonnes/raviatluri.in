import React, { ComponentPropsWithoutRef } from 'react';

import { MDXRemote, MDXRemoteProps } from 'next-mdx-remote/rsc';
import Image from 'next/image';
import Link from 'next/link';

import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { twMerge } from 'tailwind-merge';

import { CopyButton } from './copy-button';

type HeadingProps = ComponentPropsWithoutRef<'h1'>;
type ParagraphProps = ComponentPropsWithoutRef<'p'>;
type ListProps = ComponentPropsWithoutRef<'ul'>;
type ListItemProps = ComponentPropsWithoutRef<'li'>;
type AnchorProps = ComponentPropsWithoutRef<'a'>;
type BlockquoteProps = ComponentPropsWithoutRef<'blockquote'>;

const customComponents = {
  h1: ({ className, ...props }: HeadingProps) => (
    <h1
      className={twMerge(
        'text-2xl font-semibold mt-12 mb-4 text-text-primary tracking-tight',
        className
      )}
      {...props}
    />
  ),
  h2: ({ className, ...props }: HeadingProps) => (
    <h2
      className={twMerge(
        'text-xl font-semibold mt-10 mb-4 text-text-primary tracking-tight',
        className
      )}
      {...props}
    />
  ),
  h3: ({ className, ...props }: HeadingProps) => (
    <h3
      className={twMerge(
        'text-lg font-semibold mt-8 mb-3 text-text-primary tracking-tight',
        className
      )}
      {...props}
    />
  ),
  h4: ({ className, ...props }: HeadingProps) => (
    <h4
      className={twMerge('text-base font-semibold mt-6 mb-3 text-text-primary', className)}
      {...props}
    />
  ),
  p: ({ className, ...props }: ParagraphProps) => (
    <p className={twMerge('leading-7 my-6 text-text-secondary', className)} {...props} />
  ),
  ol: ({ className, ...props }: ListProps) => (
    <ol
      className={twMerge('list-decimal pl-6 space-y-3 my-6 text-text-secondary', className)}
      {...props}
    />
  ),
  ul: ({ className, ...props }: ListProps) => (
    <ul
      className={twMerge('list-disc pl-6 space-y-2 my-6 text-text-secondary', className)}
      {...props}
    />
  ),
  li: ({ className, ...props }: ListItemProps) => (
    <li className={twMerge('pl-2 leading-7', className)} {...props} />
  ),
  em: ({ className, ...props }: ComponentPropsWithoutRef<'em'>) => (
    <em className={twMerge('', className)} {...props} />
  ),
  strong: ({ className, ...props }: ComponentPropsWithoutRef<'strong'>) => (
    <strong className={twMerge('font-semibold', className)} {...props} />
  ),
  a: ({ href, children, ...props }: AnchorProps) => {
    const className = twMerge('text-primary hover:text-primary', props.className);
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
        <code className="bg-surface-50 rounded px-1.5 py-0.5 font-mono text-[0.90em]" {...props}>
          {children}
        </code>
      );
    }
    // Code block
    const codeString = String(children).replace(/\n$/, '');
    const customStyle = style || {
      margin: '1.5rem 0',
      padding: '1rem',
      borderRadius: '0.5rem',
      fontSize: '0.875rem',
      lineHeight: '1.5',
    };
    return (
      <div className="relative group">
        <div className="absolute top-3 right-3 z-10">
          <CopyButton text={codeString} />
        </div>
        <SyntaxHighlighter
          language={language}
          style={vscDarkPlus}
          customStyle={customStyle}
          {...props}
        >
          {codeString}
        </SyntaxHighlighter>
      </div>
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
  blockquote: ({ className, ...props }: BlockquoteProps) => (
    <blockquote
      className={twMerge(
        'ml-2 my-8 border-l-4 border-primary pl-6 py-2 bg-primary-50/50 text-text-secondary italic font-medium rounded-r',
        className
      )}
      {...props}
    />
  ),
  img: ({ className, ...props }: ComponentPropsWithoutRef<'img'>) => {
    const { width = 800, height = 600, alt = '', src, ...rest } = props;
    if (!src) return null;
    return (
      <Image
        src={src}
        width={Number(width)}
        height={Number(height)}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        className={twMerge('rounded-lg', className)}
        alt={alt}
        {...rest}
      />
    );
  },
  Image: ({ className, ...props }: React.ComponentProps<typeof Image>) => {
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
            className={twMerge('rounded-lg shadow-sm', className)}
            alt={alt}
            {...rest}
          />
        </div>
        <div className="mt-2 text-xs italic text-text-primary">{props.alt}</div>
      </div>
    );
  },
  Video: ({ className, ...props }: ComponentPropsWithoutRef<'video'> & { alt: string }) => {
    const { alt = '', src, ...rest } = props;
    if (!src) return null;
    return (
      <div className="grid grid-cols-1 justify-items-center mt-4 mb-8">
        <video className={twMerge('rounded-lg', className)} src={src} {...rest} />
        <div className="text-xs italic text-text-primary">{alt}</div>
      </div>
    );
  },
  div: ({ className, ...props }: ComponentPropsWithoutRef<'div'>) => (
    <div className={twMerge('', className)} {...props} />
  ),
  span: ({ className, ...props }: ComponentPropsWithoutRef<'span'>) => (
    <span className={twMerge('', className)} {...props} />
  ),
  br: ({ className, ...props }: ComponentPropsWithoutRef<'br'>) => (
    <br className={twMerge('', className)} {...props} />
  ),
  hr: ({ className, ...props }: ComponentPropsWithoutRef<'hr'>) => (
    <hr className={twMerge('', className)} {...props} />
  ),
};

export function CustomMDX(props: MDXRemoteProps) {
  return <MDXRemote {...props} components={customComponents} />;
}

export function getMDXComponents() {
  return customComponents;
}
