import type { FC, PropsWithChildren } from 'react';

import { useContext } from 'react';

import { cn } from '~/lib/utils';

import { ListBoxContext } from './context';

export type ListBoxItemProps = {
  value: string | number;
  index?: number;
  isActive?: boolean;
};

export const ListBoxItem: FC<PropsWithChildren<ListBoxItemProps>> = ({
  children,
  value,
  index = 0,
  isActive,
}) => {
  const context = useContext(ListBoxContext);
  if (!context) {
    throw new Error('ListBoxItem must be used within a ListBox');
  }
  const { onSelect } = context;

  const handleSelect = () => onSelect && onSelect(value);

  return (
    <div
      role='button'
      tabIndex={index}
      onKeyDown={handleSelect}
      onClick={handleSelect}
      className={cn(
        'hover:bg-accent hover:text-muted-foreground flex cursor-pointer items-center gap-2 rounded-sm p-2 text-sm transition-colors',
        isActive && 'bg-accent',
        !isActive && 'text-muted-foreground',
      )}
    >
      {children}
    </div>
  );
};
