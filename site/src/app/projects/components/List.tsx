'use client';

import type { ProjectItemType } from '@esnext/server';

import { useEffect, useMemo, useRef } from 'react';
import { Icon } from '@iconify/react';

import ProjectBox, { ProjectSkeleton } from '~/components/ProjectBox';
import { Button } from '~/components/ui/button';
import { api } from '~/trpc/react';

const listClass =
  'grid h-fit grid-cols-3 gap-4 max-2xl:grid-cols-2 max-lg:grid-cols-1';

export const List = ({ list }: { list: ProjectItemType[] }) => {
  return list.map((project) => <ProjectBox key={project.id} item={project} />);
};

export const SkeletonList = () => {
  return Array.from({ length: 10 }).map((_, index) => (
    <ProjectSkeleton key={index} />
  ));
};

export default function Project() {
  const loadingRef = useRef<HTMLDivElement>(null);
  const query = api.project.query.useInfiniteQuery(
    {
      limit: 10,
    },
    {
      refetchOnWindowFocus: false,
      getNextPageParam: (lastPage) => lastPage.nextCursor,
    },
  );

  const { data, hasNextPage, fetchNextPage, isLoading } = query;
  const { pages = [] } = data ?? {};

  useEffect(() => {
    if (!loadingRef.current) return;

    const ob = new IntersectionObserver((entries) => {
      if (!entries[0]?.isIntersecting) {
        return;
      }
      if (isLoading) {
        return;
      }
      fetchNextPage().catch((err) => console.error(err));
    });
    ob.observe(loadingRef.current);
  }, [fetchNextPage, isLoading]);

  const currentList = useMemo(() => {
    return pages.flatMap((page) => page.list);
  }, [pages]);

  return (
    <div>
      <div className={listClass}>
        <List list={currentList} />
      </div>
      {hasNextPage || isLoading ? (
        <div ref={loadingRef} className={listClass}>
          <SkeletonList />
        </div>
      ) : null}
      <div className='mt-16 flex h-60 flex-col items-center'>
        <Icon
          icon='material-symbols:auto-awesome-rounded'
          className='text-4xl text-yellow-300'
        />
        <p className='mb-4'>
          Can&apos;t find the project you&apos;re looking for?
        </p>
        <Button>Request new project</Button>
      </div>
    </div>
  );
}
