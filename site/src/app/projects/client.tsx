'use client';

import { useCallback } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import ProjectList from '~/app/projects/components/List';
import Sidebar from '~/app/projects/components/Sidebar';
import SortFilter from '~/app/projects/components/Sort';
import Top from '~/components/Top';

import Tags from './components/Tags';

export default function ProjectPage() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const onChangeParams = useCallback(
    (name: string, value: string | number, isDelete?: boolean) => {
      const params = new URLSearchParams(searchParams);
      if (isDelete) {
        params.delete(name);
      } else {
        params.set(name, String(value));
      }
      router.push(pathname + '?' + params.toString());
    },
    [pathname, router, searchParams],
  );

  return (
    <>
      <div className='relative flex'>
        <Sidebar onChangeParams={onChangeParams} />
        <div className='m-auto mt-4 flex flex-1 flex-col overflow-hidden px-8'>
          <Tags onChangeParams={onChangeParams} />
          <SortFilter onChangeParams={onChangeParams} />
          <ProjectList onChangeParams={onChangeParams} />
        </div>
      </div>
      <Top />
    </>
  );
}
