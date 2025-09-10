import Link from 'next/link';

import navigation from '@/content/navigation';

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="transition hover:text-primary">
      {children}
    </Link>
  );
}

export default function Footer() {
  return (
    <footer className="mt-32">
      <div className={'sm:px-8'}>
        <div className="mx-auto max-w-7xl lg:px-8">
          <div className={'relative px-4 sm:px-8 lg:px-12'}>
            <div className="mx-auto max-w-2xl lg:max-w-5xl">
              <div className="border-t border-border pb-16 pt-10">
                <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
                  <div className="flex gap-6 text-sm font-medium text-text-primary">
                    {navigation.map(item => (
                      <NavLink key={item.href} href={item.href}>
                        {item.name}
                      </NavLink>
                    ))}
                  </div>
                  <p className="text-sm text-text-muted">
                    &copy; {new Date().getFullYear()} Ravi Atluri. All rights reserved.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
