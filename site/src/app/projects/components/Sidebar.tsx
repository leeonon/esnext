'use client';

import type { FC, PropsWithChildren } from 'react';

import { memo } from 'react';
import { Icon } from '@iconify/react';

import { category } from '~/constant/category';
import { cn } from '~/lib/utils';

export type onChangeParams = (name: string, value: string) => void;

const IconWrapper: FC<
  PropsWithChildren<{ className?: string; styles?: React.CSSProperties }>
> = ({ children, className, styles }) => (
  <div
    className={cn(
      className,
      'rounded-small flex h-7 w-7 min-w-[1.75rem] items-center justify-center',
    )}
    style={styles}
  >
    {children}
  </div>
);

function SidebarItem({
  item,
  isActive,
  onChangeParams,
}: {
  item: (typeof category)[0];
  isActive: boolean;
  onChangeParams: onChangeParams;
}) {
  const onClick = () => onChangeParams('category', item.name);
  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events
    <div
      className={cn(
        'mt-2 flex h-10 cursor-pointer items-center gap-4 rounded-md px-4 transition-colors hover:border',
        isActive && 'bg-accent border-[rgb(57, 57, 57)]',
      )}
      onClick={onClick}
    >
      <IconWrapper styles={{ backgroundColor: item.color }}>
        <Icon fontSize={16} icon={item.icon} />
      </IconWrapper>
      <div className='text-sm'>{item.name}</div>
      <div className='text-muted-foreground ml-auto text-xs'>{item.count}</div>
    </div>
  );
}

export default memo(function Sidebar({
  onChangeParams,
}: {
  onChangeParams: onChangeParams;
}) {
  return (
    <div className='sticky top-[calc(4rem+1px)] self-start px-4 pt-4'>
      <div className='text-small mb-4 font-bold text-fuchsia-500'>
        Categories
      </div>
      {category.map((item) => (
        <SidebarItem
          key={item.name}
          item={item}
          onChangeParams={onChangeParams}
          isActive={item.name === 'ALL'}
        />
      ))}
    </div>
  );
});
