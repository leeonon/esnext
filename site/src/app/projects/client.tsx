'use client';

import { useCallback, useMemo } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import ProjectList from '~/app/projects/components/List';
import Sidebar from '~/app/projects/components/Sidebar';
import SortFilter from '~/app/projects/components/Sort';
import Top from '~/components/Top';
import { api } from '~/trpc/react';

import Tags from './components/Tags';

export default function ProjectPage() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const categorySlug = useSearchParams().get('category');
  const query = api.project.query.useInfiniteQuery(
    {
      limit: 10,
      categorySlug,
    },
    {
      refetchOnWindowFocus: false,
      getNextPageParam: (lastPage) => lastPage.nextCursor,
    },
  );

  const { data, hasNextPage, fetchNextPage, isLoading } = query;
  const { pages = [] } = data ?? {};

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

  const currentList = useMemo(() => {
    return pages.flatMap((page) => page.list);
  }, [pages]);

  const onNextPage = useCallback(() => {
    fetchNextPage().catch((err) => console.error(err));
  }, [fetchNextPage]);

  return (
    <>
      <div className='relative flex'>
        <Sidebar onChangeParams={onChangeParams} total={pages[0]?.total || 0} />
        <div className='m-auto mt-4 flex flex-1 flex-col overflow-hidden px-8'>
          <Tags onChangeParams={onChangeParams} />
          <SortFilter onChangeParams={onChangeParams} />
          <ProjectList
            isLoading={isLoading}
            list={currentList}
            hasNextPage={hasNextPage}
            onNextPage={onNextPage}
            onChangeParams={onChangeParams}
          />
        </div>
      </div>
      <Top />
    </>
  );
}
