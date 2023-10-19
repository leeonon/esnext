"use client";

import { useCallback } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import ProjectList from "~/app/projects/list";
import Sidebar from "~/app/projects/sidebar";
import Tags from "~/app/projects/tags";
import Top from "~/components/Top";

export default function ProjectPage() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const onChangeParams = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams);
      params.set(name, value);
      router.push(pathname + "?" + params.toString());
    },
    [pathname, router, searchParams],
  );

  return (
    <>
      <div>
        <div className="flex">
          <Sidebar onChangeParams={onChangeParams} />
          <div className="flex flex-1 flex-col overflow-hidden px-8">
            <Tags onChangeParams={onChangeParams} />
            <ProjectList />
          </div>
        </div>
      </div>
      <Top />
    </>
  );
}
