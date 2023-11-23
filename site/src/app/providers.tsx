'use client';

import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ClickToComponent } from 'click-to-react-component';
import { SessionProvider } from 'next-auth/react';
import { ThemeProvider } from 'next-themes';

import {
  createGlobalDataStore,
  GlobalDataStoreContext,
} from '~/store/index.store';
import { api } from '~/trpc/react';

import '~/styles/globals.css';

export function ESNextProviders({ children }: { children: React.ReactNode }) {
  const { data: categories } = api.project.categories.useQuery(undefined, {
    refetchOnWindowFocus: false,
  });
  const store = createGlobalDataStore({
    categories: categories ?? [],
  });
  return (
    <ThemeProvider attribute='class' storageKey='theme' defaultTheme='dark'>
      <GlobalDataStoreContext.Provider value={store}>
        <SessionProvider>{children}</SessionProvider>
        <ClickToComponent />
        <ReactQueryDevtools initialIsOpen={true} />
      </GlobalDataStoreContext.Provider>
    </ThemeProvider>
  );
}
