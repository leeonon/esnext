"use client";

import { cn, Spinner } from "@nextui-org/react";
import { api } from "~/trpc/react";
import { useEffect, useMemo, useRef } from "react";

import ProjectBox from "~/components/ProjectBox";

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

  const listElement = useMemo(() => {
    return currentList.map((project, index) => (
      <ProjectBox
        key={project.id}
        item={project}
        cover={
          index % 4 === 0
            ? "https://lee-oss-1300118632.cos.ap-nanjing.myqcloud.com/obsidian/202309252111915.png"
            : undefined
        }
        className={cn(index % 4 === 0 ? "row-span-2" : "h-[160px]")}
      />
    ));
  }, [currentList]);

  return (
    <div>
      <div className="grid h-fit grid-cols-3 grid-rows-[160px] gap-4 max-2xl:grid-cols-2 max-lg:grid-cols-1">
        {listElement}
      </div>
      {hasNextPage ? (
        <Spinner ref={loadingRef} className="mx-auto my-8 flex w-fit" />
      ) : null}
    </div>
  );
}
