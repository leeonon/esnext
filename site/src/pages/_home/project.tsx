"use client";

import ProjectBox from "~/components/ProjectBox";
import { api } from "~/utils/api";

export default function Project() {
  const { data } = api.project.all.useQuery(undefined, {
    refetchOnWindowFocus: false,
  });
  return (
    <div className="mx-auto mt-4 max-w-screen-xl px-10">
      <h1 className="text-4xl">Projects</h1>
      {data?.map((project) => <ProjectBox key={project.id} item={project} />)}
    </div>
  );
}
