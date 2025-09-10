import Link from 'next/link';

import clsx from 'clsx';

export function SocialLink({
  className,
  href,
  children,
  icon: Icon,
}: {
  className?: string;
  href: string;
  children?: React.ReactNode;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  'aria-label'?: string;
}) {
  return (
    <li className={clsx(className, 'flex')}>
      <Link
        href={href}
        className="group flex min-h-[44px] min-w-[44px] items-center text-sm font-medium text-text-primary transition-colors duration-200 hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-md p-2"
        target={href.startsWith('http') ? '_blank' : undefined}
        rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
      >
        <Icon className="h-6 w-6 flex-none fill-text-tertiary transition-colors duration-200 group-hover:fill-primary group-focus:fill-primary" />
        <span className="ml-4">{children}</span>
      </Link>
    </li>
  );
}
