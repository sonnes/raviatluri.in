import Link from 'next/link';

import clsx from 'clsx';

import { ChevronRightIcon } from '@/components/icons';

export function Card({
  as: Component = 'div',
  className,
  children,
}: {
  as?: React.ElementType;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <Component className={clsx(className, 'group relative flex flex-col items-start')}>
      <div className="absolute -inset-x-4 -inset-y-6 z-0 scale-95 bg-zinc-50 opacity-0 transition group-hover:scale-100 group-hover:opacity-100 sm:-inset-x-6 sm:rounded-2xl" />
      {children}
    </Component>
  );
}

Card.Link = function CardLink({
  children,
  ...props
}: {
  children: React.ReactNode;
  [key: string]: string | React.ReactNode;
}) {
  return (
    <>
      <Link href={''} {...props}>
        <span className="absolute -inset-x-4 -inset-y-6 z-20 sm:-inset-x-6 sm:rounded-2xl" />
        <span className="relative z-10">{children}</span>
      </Link>
    </>
  );
};

Card.Title = function CardTitle({
  as: Component = 'h2',
  href,
  children,
}: {
  as?: React.ElementType;
  href?: string;
  children: React.ReactNode;
}) {
  return (
    <Component className="text-base font-semibold tracking-tight text-zinc-800">
      {href ? <Card.Link href={href}>{children}</Card.Link> : children}
    </Component>
  );
};

Card.Description = function CardDescription({ children }: { children: React.ReactNode }) {
  return <p className="relative z-10 mt-2 text-sm text-zinc-600">{children}</p>;
};

Card.Cta = function CardCta({ children }: { children: React.ReactNode }) {
  return (
    <div
      aria-hidden="true"
      className="relative z-10 mt-4 flex items-center text-sm font-medium text-red-500"
    >
      {children}
      <ChevronRightIcon className="ml-1 h-4 w-4 stroke-current" />
    </div>
  );
};

Card.Eyebrow = function CardEyebrow({
  as: Component = 'p',
  decorate = false,
  className,
  children,
  ...props
}: {
  as?: React.ElementType;
  decorate?: boolean;
  className?: string;
  children: React.ReactNode;
  [key: string]: string | boolean | React.ReactNode | React.ElementType | undefined;
}) {
  return (
    <Component
      className={clsx(
        className,
        'relative z-10 order-first mb-3 flex items-center text-sm text-zinc-400',
        decorate && 'pl-3.5'
      )}
      {...props}
    >
      {decorate && (
        <span className="absolute inset-y-0 left-0 flex items-center" aria-hidden="true">
          <span className="h-4 w-0.5 rounded-full bg-zinc-200" />
        </span>
      )}
      {children}
    </Component>
  );
};
