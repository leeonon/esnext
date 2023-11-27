import type { ProjectItemType } from '@esnext/server';

import { useEffect, useRef } from 'react';
import { Icon } from '@iconify/react';

import { useProjectsListContext } from '~/app/projects/context';
import ProjectBox, { ProjectSkeleton } from '~/components/ProjectBox';
import { Button } from '~/components/ui/button';

const listClass =
  'grid h-fit grid-cols-3 gap-4 max-2xl:grid-cols-2 max-lg:grid-cols-1';

export const SkeletonList = () => {
  return Array.from({ length: 10 }).map((_, index) => (
    <ProjectSkeleton key={index} />
  ));
};

export default function Project({
  list,
  isLoading,
  hasNextPage,
  onNextPage,
}: {
  list: ProjectItemType[];
  hasNextPage?: boolean;
  isLoading: boolean;
  onNextPage: () => void;
}) {
  const { onChangeParams } = useProjectsListContext();
  const loadingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!loadingRef.current) return;

    const ob = new IntersectionObserver((entries) => {
      if (!entries[0]?.isIntersecting) {
        return;
      }
      if (isLoading) {
        return;
      }
      onNextPage();
    });
    ob.observe(loadingRef.current);
  }, [onNextPage, isLoading]);

  return (
    <div>
      <div className={listClass}>
        {list.map((item: ProjectItemType) => (
          <ProjectBox
            key={item.id}
            item={item}
            onChangeParams={onChangeParams}
          />
        ))}
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
