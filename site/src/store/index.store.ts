import type { Category } from '@esnext/server';

import { createContext, useContext } from 'react';
import { createStore, useStore } from 'zustand';

type GlobalDataType = {
  categories: Category[];
};

export type GlobalDataStore = ReturnType<typeof createGlobalDataStore>;

export const createGlobalDataStore = (initProps: GlobalDataType) => {
  const DEFAULT_PROPS: GlobalDataType = {
    categories: [],
  };

  return createStore<GlobalDataType>((set) => ({
    ...DEFAULT_PROPS,
    ...initProps,
    set: (data: Category[]) => set({ categories: data }),
    initializeData: (initialData: GlobalDataType) => set(initialData),
  }));
};

export const GlobalDataStoreContext = createContext<GlobalDataStore | null>(
  null,
);

export function useGlobalDataContext<T>(
  selector: (state: GlobalDataType) => T,
): T {
  const store = useContext(GlobalDataStoreContext);
  if (!store) {
    throw new Error(
      'useGlobalDataContext must be used within a GlobalDataStoreContext',
    );
  }
  return useStore(store, selector);
}
