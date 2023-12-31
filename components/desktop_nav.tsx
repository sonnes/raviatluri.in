import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

import clsx from 'clsx';

function NavItem({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}): JSX.Element {
  let isActive = usePathname().startsWith(href);

  return (
    <li>
      <Link
        href={href}
        className={clsx(
          'relative block px-3 py-2 transition',
          isActive
            ? 'text-red-500 dark:text-red-400'
            : 'hover:text-red-500 dark:hover:text-red-400'
        )}
      >
        {children}
        {isActive && (
          <span className="absolute inset-x-1 -bottom-px h-px bg-gradient-to-r from-red-500/0 via-red-500/40 to-red-500/0 dark:from-red-400/0 dark:via-red-400/40 dark:to-red-400/0" />
        )}
      </Link>
    </li>
  );
}

type Props = {
  links: { href: string; name: string }[];
  className?: string;
};

export default function DesktopNavigation({
  links,
  className,
}: Props): JSX.Element {
  let router = useRouter();
  return (
    <nav className={className}>
      <ul className="flex rounded-full bg-white/90 px-3 text-sm font-medium text-zinc-800 shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur dark:bg-zinc-800/90 dark:text-zinc-200 dark:ring-white/10">
        {links.map(({ href, name }, index) => (
          <NavItem key={index} href={href}>
            {name}
          </NavItem>
        ))}
      </ul>
    </nav>
  );
}
