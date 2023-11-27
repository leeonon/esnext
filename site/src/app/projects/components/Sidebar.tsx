'use client';

import type { Category } from '@esnext/server';
import type { FC, PropsWithChildren } from 'react';

import { memo } from 'react';
import { useSearchParams } from 'next/navigation';
import { Icon } from '@iconify/react';

import { cn } from '~/lib/utils';
import { useGlobalDataContext } from '~/store/index.store';

import { useProjectsListContext } from '../context';

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
}: {
  item: Category;
  isActive: boolean;
}) {
  const { onChangeParams } = useProjectsListContext();
  const onClick = () =>
    onChangeParams('category', item.slug, item.slug === 'all');
  return (
    <div
      className={cn(
        'bg-card-primary text-muted-foreground hover:bg-accent border-input hover:text-accent-foreground group col-span-1 flex cursor-pointer flex-col justify-between rounded-lg border p-2 transition ease-in-out dark:hover:border-fuchsia-400',
        isActive && 'border-input border border-fuchsia-500',
      )}
      onKeyDown={onClick}
      onClick={onClick}
    >
      <div className='flex items-center justify-between'>
        <IconWrapper styles={{ backgroundColor: item.bgColor ?? '' }}>
          <Icon fontSize={14} icon={item.icon ?? 'logos:javascript'} />
        </IconWrapper>
        <div className='text-muted-foreground bg-accent ml-auto rounded-md px-2 py-1 text-xs'>
          {item.count}
        </div>
      </div>
      <div className='dark:text-primary-400 dark:group-hover:text-primary-400 mt-2 text-left text-sm font-medium sm:text-xs 2xl:text-sm'>
        {item.name}
      </div>
    </div>
  );
}

export default memo(function Sidebar({ total }: { total: number }) {
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
    <div className='sticky top-[calc(4rem+1px)] h-[calc(100vh-4rem)] w-[320px] self-start px-4 pt-4 2xl:min-w-[350px]'>
      <div className='mb-4 font-bold text-fuchsia-500'>Categories</div>
      <div className='mt-2 grid grid-cols-2 grid-rows-2 gap-2'>
        {_categories.map((item) => (
          <SidebarItem
            key={item.name}
            item={item}
            isActive={
              item.slug === category || (item.slug === 'all' && !category)
            }
          />
        ))}
      </div>
    </div>
  );
});
