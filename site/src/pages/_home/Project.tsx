"use client";

import ProjectBox from "~/components/ProjectBox";
import { api } from "~/utils/api";

export default function Project() {
  const { data } = api.project.all.useQuery(undefined, {
    refetchOnWindowFocus: false,
  });
  return (
    <div className="flex h-fit flex-grow flex-wrap gap-4">
      {data?.map((project) => (
        <ProjectBox
          className="w-full flex-auto sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/4"
          key={project.id}
          item={project}
        />
      ))}
    </div>
  );
}
