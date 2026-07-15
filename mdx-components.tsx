import React, { ComponentPropsWithoutRef } from 'react';
import Link from 'next/link';
import { highlight } from 'sugar-high';

type HeadingProps = ComponentPropsWithoutRef<'h1'>;
type ParagraphProps = ComponentPropsWithoutRef<'p'>;
type ListProps = ComponentPropsWithoutRef<'ul'>;
type ListItemProps = ComponentPropsWithoutRef<'li'>;
type AnchorProps = ComponentPropsWithoutRef<'a'>;
type BlockquoteProps = ComponentPropsWithoutRef<'blockquote'>;

const components = {
  h1: (props: HeadingProps) => (
    <h1 className="text-3xl font-bold tracking-tight text-white md:text-5xl font-display uppercase pt-6" {...props} />
  ),
  h2: (props: HeadingProps) => (
    <h2
      className="text-white font-semibold text-lg sm:text-xl tracking-tight mt-12 mb-5 uppercase border-b border-white/10 pb-2 relative after:content-[''] after:absolute after:bottom-[-1px] after:left-0 after:w-12 after:h-[2px] after:bg-emerald-400"
      {...props}
    />
  ),
  h3: (props: HeadingProps) => (
    <h3
      className="text-white font-medium text-base sm:text-lg tracking-tight mt-8 mb-3"
      {...props}
    />
  ),
  h4: (props: HeadingProps) => <h4 className="font-medium text-zinc-100 mt-6" {...props} />,
  p: (props: ParagraphProps) => (
    <p className="text-zinc-300 leading-relaxed text-[15px] sm:text-base my-5 font-normal antialiased max-w-3xl" {...props} />
  ),
  ol: (props: ListProps) => (
    <ol
      className="text-zinc-300 list-decimal pl-5 space-y-2 my-5 max-w-3xl"
      {...props}
    />
  ),
  ul: (props: ListProps) => (
    <ul
      className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-8 max-w-3xl list-none pl-0"
      {...props}
    />
  ),
  li: (props: ListItemProps) => (
    <li
      className="relative overflow-hidden rounded-2xl border border-white/5 bg-zinc-950/40 p-5 text-zinc-300 transition-all duration-300 hover:border-emerald-500/20 hover:bg-emerald-500/[0.02] hover:-translate-y-1 shadow-lg shadow-black/20 group/li [&>strong]:block [&>strong]:mb-1.5 [&>strong]:text-[11px] [&>strong]:uppercase [&>strong]:tracking-wider [&>strong]:text-emerald-400 [&>strong]:font-semibold"
      {...props}
    />
  ),
  em: (props: ComponentPropsWithoutRef<'em'>) => (
    <em className="font-medium" {...props} />
  ),
  strong: (props: ComponentPropsWithoutRef<'strong'>) => (
    <strong className="font-medium" {...props} />
  ),
  a: ({ href, children, ...props }: AnchorProps) => {
    const className =
      'text-blue-500 hover:text-blue-700 dark:text-gray-400 hover:dark:text-gray-300 dark:underline dark:underline-offset-2 dark:decoration-gray-800';
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
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
        {...props}
      >
        {children}
      </a>
    );
  },
  code: ({ children, ...props }: ComponentPropsWithoutRef<'code'>) => {
    const codeHTML = highlight(children as string);
    return <code dangerouslySetInnerHTML={{ __html: codeHTML }} {...props} />;
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
      className="my-6 border-l-2 border-emerald-500/50 pl-4 italic text-zinc-400"
      {...props}
    />
  ),
};

declare global {
  type MDXProvidedComponents = typeof components;
}

export function useMDXComponents(): MDXProvidedComponents {
  return components;
}
