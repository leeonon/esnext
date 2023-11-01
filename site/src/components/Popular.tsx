/* eslint-disable jsx-a11y/click-events-have-key-events */
'use client';

import type { ProjectItemType } from '@esnext/server';

import { useRouter } from 'next/navigation';
import { Icon } from '@iconify/react';

import ProjectBox from '~/components/ProjectBox';

export type PopularProps = {
  projects: ProjectItemType[];
};

export default function Popular(props: PopularProps) {
  const router = useRouter();
  const { projects } = props;

  return (
    <div className='mt-6'>
      <div className='flex h-fit flex-grow flex-wrap gap-4'>
        {projects.map((project) => (
          <ProjectBox
            className='w-full flex-auto sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/4'
            key={project.id}
            item={project}
          />
        ))}
      </div>
      <div
        className='bg-default-50 transition-background hover:bg-default-100 mt-4 flex cursor-pointer items-center justify-center rounded py-2'
        onClick={() => router.push('/projects')}
      >
        <span>View All</span>
        <Icon icon='lucide:chevrons-right' fontSize={20} className='ml-2' />
      </div>
    </div>
  );
}
