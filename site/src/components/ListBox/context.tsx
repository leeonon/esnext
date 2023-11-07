import * as React from 'react';

export type ListBoxContextValue = {
  value?: string | number;
  onSelect?: (value: string | number) => void;
};
export const ListBoxContext = React.createContext<ListBoxContextValue>({});
