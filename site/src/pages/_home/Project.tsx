"use client";

import ProjectBox from "~/components/ProjectBox";
import { api } from "~/utils/api";

export default function Project() {
  const { data } = api.project.all.useQuery(undefined, {
    refetchOnWindowFocus: false,
  });
  return (
    <div className="mx-auto mt-4 max-w-screen-xl px-10">
      <h1 className="mb-4 text-4xl">Projects</h1>
      <div className="flex flex-grow flex-wrap gap-4">
        {data?.map((project) => (
          <ProjectBox
            className="w-full flex-auto sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/4"
            key={project.id}
            item={project}
          />
        ))}
      </div>
    </div>
  );
}
