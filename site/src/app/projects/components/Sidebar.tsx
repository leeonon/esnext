'use client';

import type { Category } from '@esnext/server';
import type { FC, PropsWithChildren } from 'react';

import { memo } from 'react';
import { useSearchParams } from 'next/navigation';
import { Icon } from '@iconify/react';

import { cn } from '~/lib/utils';
import { useGlobalDataContext } from '~/store/index.store';

export type onChangeParams = (
  name: string,
  value: string | number,
  isDelete?: boolean,
) => void;

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
  item: Category;
  isActive: boolean;
  onChangeParams: onChangeParams;
}) {
  const onClick = () =>
    onChangeParams('category', item.slug, item.slug === 'all');
  return (
    <div
      className={cn(
        'hover:bg-accent mt-2 flex h-8 cursor-pointer items-center gap-4 rounded-md px-4 transition-colors',
        isActive && 'bg-accent',
      )}
      onKeyDown={onClick}
      onClick={onClick}
    >
      <IconWrapper styles={{ backgroundColor: item.bgColor ?? '' }}>
        <Icon fontSize={14} icon={item.icon ?? 'logos:javascript'} />
      </IconWrapper>
      <div className='text-sm'>{item.name}</div>
      <div className='text-muted-foreground bg-accent ml-auto rounded-md px-2 py-1 text-xs'>
        {item.count}
      </div>
    </div>
  );
}

export default memo(function Sidebar({
  onChangeParams,
  total,
}: {
  onChangeParams: onChangeParams;
  total: number;
}) {
  const searchParams = useSearchParams();
  const category = searchParams.get('category');
  const categories = useGlobalDataContext((state) => state.categories);
  const _categories = [
    {
      id: 0,
      name: 'ALL',
      bgColor: '#FF8F1F30',
      icon: 'fxemoji:fire',
      slug: 'all',
      count: total,
    },
    ...categories,
  ];
  return (
    <div className='bg-card-primary sticky top-[calc(4rem+1px)] h-[calc(100vh-4rem)] w-[320px] self-start px-4 pt-4'>
      <div className='text-small mb-4 font-bold text-fuchsia-500'>
        Categories
      </div>
      {_categories.map((item) => (
        <SidebarItem
          key={item.name}
          item={item}
          onChangeParams={onChangeParams}
          isActive={
            item.slug === category || (item.slug === 'all' && !category)
          }
        />
      ))}
    </div>
  );
});
