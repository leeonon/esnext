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
      'flex h-6 w-6 items-center justify-center rounded-sm',
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
    <div
      className={cn(
        'hover:bg-accent mt-2 flex h-8 cursor-pointer items-center gap-4 rounded-md px-4 transition-colors',
        isActive && 'bg-accent',
      )}
      onKeyDown={onClick}
      onClick={onClick}
    >
      <IconWrapper styles={{ backgroundColor: item.color }}>
        <Icon fontSize={14} icon={item.icon} />
      </IconWrapper>
      <div className='text-sm'>{item.name}</div>
      <div className='text-muted-foreground bg-accent ml-auto rounded-lg p-1 text-xs'>
        {item.count}
      </div>
    </div>
  );
}

export default memo(function Sidebar({
  onChangeParams,
}: {
  onChangeParams: onChangeParams;
}) {
  return (
    <div className='bg-card-primary sticky top-[calc(4rem+1px)] h-[calc(100vh-4rem)] w-[240px] self-start px-4 pt-4'>
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
