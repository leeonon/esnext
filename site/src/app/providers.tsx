'use client';

import type { Category } from '@esnext/server';

import { useRef } from 'react';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { SessionProvider } from 'next-auth/react';
import { ThemeProvider } from 'next-themes';

import {
  createGlobalDataStore,
  GlobalDataStoreContext,
} from '~/store/index.store';

export function ESNextProviders({
  children,
  categories,
}: {
  children: React.ReactNode;
  categories: Category[];
}) {
  const store = useRef(
    createGlobalDataStore({
      categories: categories ?? [],
    }),
  ).current;
  return (
    <ThemeProvider attribute='class' storageKey='theme' defaultTheme='dark'>
      <GlobalDataStoreContext.Provider value={store}>
        <SessionProvider>{children}</SessionProvider>
        <ReactQueryDevtools initialIsOpen={true} />
      </GlobalDataStoreContext.Provider>
    </ThemeProvider>
  );
}
