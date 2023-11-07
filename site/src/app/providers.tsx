'use client';

import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { SessionProvider } from 'next-auth/react';
import { ThemeProvider } from 'next-themes';

export function ESNextProviders({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute='class' storageKey='theme' defaultTheme='dark'>
      <SessionProvider>{children}</SessionProvider>
      <ReactQueryDevtools initialIsOpen={true} />
    </ThemeProvider>
  );
}
