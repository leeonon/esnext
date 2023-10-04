"use client";

import { Button } from "@nextui-org/react";
import { useEffect, useMemo, useRef } from "react";

import ProjectBox, { ProjectSkeleton } from "~/components/ProjectBox";
import { api } from "~/utils/api";

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
    <div>
      <div className="flex h-fit flex-grow flex-wrap gap-4">
        {!isLoading &&
          currentList.map((project) => (
            <ProjectBox
              className="w-full flex-auto sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/4"
              key={project.id}
              item={project}
            />
          ))}
      </div>
      {hasNextPage && (
        <div
          className="mt-4 flex h-fit flex-grow flex-wrap gap-4"
          ref={loadingRef}
        >
          <ProjectSkeleton />
          <ProjectSkeleton />
          <ProjectSkeleton />
          <ProjectSkeleton />
          <ProjectSkeleton />
          <ProjectSkeleton />
        </div>
      )}
    </div>
  );
}
