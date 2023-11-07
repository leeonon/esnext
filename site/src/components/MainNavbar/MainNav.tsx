'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { cn } from '~/lib/utils';

function getActiveClass(pathname: string, link: string) {
  return pathname === link ? 'text-primary' : 'text-muted-foreground';
}

export function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const pathname = usePathname();

  return (
    <nav
      className={cn('flex items-center space-x-4 lg:space-x-6', className)}
      {...props}
    >
      <Link
        href='/'
        className={cn(
          'hover:text-primary text-sm font-medium transition-colors',
          getActiveClass(pathname, '/'),
        )}
      >
        Overview
      </Link>
      <Link
        href='/projects'
        className={cn(
          'hover:text-primary text-sm font-medium transition-colors',
          getActiveClass(pathname, '/projects'),
        )}
      >
        Projects
      </Link>
      <Link
        href='/trending'
        className={cn(
          'hover:text-primary text-sm font-medium transition-colors',
          getActiveClass(pathname, '/trending'),
        )}
      >
        Trend
      </Link>
      <Link
        href='/more'
        className={cn(
          'hover:text-primary text-sm font-medium transition-colors',
          getActiveClass(pathname, '/more'),
        )}
      >
        More
      </Link>
    </nav>
  );
}
