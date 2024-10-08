'use client';

import type { ProjectItemType } from '@esnext/server';

import ProjectBox from '~/components/ProjectBox';

type ProjectListProps = {
  list: ProjectItemType[];
};

export default function ProjectList({ list }: ProjectListProps) {
  return (
    <div className='mt-4 grid h-fit grid-cols-3 gap-4 max-2xl:grid-cols-2 max-lg:grid-cols-1'>
      {list.map((_, index) => (
        <ProjectBox key={index} item={_} />
      ))}
    </div>
  );
}
