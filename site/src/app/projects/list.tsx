"use client";

import { Spinner } from "@nextui-org/react";
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
      console.log("Loading more projects...");
      fetchNextPage().catch((err) => console.error(err));
    });
    ob.observe(loadingRef.current);
  }, [fetchNextPage, isLoading]);

  const currentList = useMemo(() => {
    return pages.flatMap((page) => page.list);
  }, [pages]);

  return (
    <div className="flex flex-col items-center">
      <div className="flex h-fit max-w-screen-xl flex-grow flex-wrap gap-4">
        {currentList.map((project) => (
          <ProjectBox
            className="w-full flex-auto sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/4"
            key={project.id}
            item={project}
          />
        ))}
      </div>
      {hasNextPage && (
        <Spinner ref={loadingRef} className="mx-auto my-8 flex w-fit" />
      )}
    </div>
  );
}
