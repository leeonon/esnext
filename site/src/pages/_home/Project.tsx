"use client";

import { Button } from "@nextui-org/react";
import { useMemo } from "react";

import ProjectBox, { ProjectSkeleton } from "~/components/ProjectBox";
import { api } from "~/utils/api";

export default function Project() {
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

  const onMore = () => {
    if (hasNextPage) {
      fetchNextPage().catch((err) => console.error(err));
    }
  };

  const currentList = useMemo(() => {
    return pages.flatMap((page) => page.list);
  }, [pages]);

  return (
    <div className="flex h-fit flex-grow flex-wrap gap-4">
      {!isLoading &&
        currentList.map((project) => (
          <ProjectBox
            className="w-full flex-auto sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/4"
            key={project.id}
            item={project}
          />
        ))}
      {isLoading
        ? Array.from({ length: 10 }).map((_, index) => (
            <ProjectSkeleton key={index} />
          ))
        : null}

      <Button onClick={onMore}>加载更多</Button>
    </div>
  );
}
