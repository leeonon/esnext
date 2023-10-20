"use client";

import { useCallback } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import ProjectList from "~/app/projects/list";
import Sidebar from "~/app/projects/sidebar";
import SortFilter from "~/app/projects/sort";
import Tags from "~/app/projects/tags";
import Top from "~/components/Top";

export default function ProjectPage() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const onChangeParams = useCallback(
    (name: string, value: string, isDelete?: boolean) => {
      const params = new URLSearchParams(searchParams);
      if (isDelete) {
        params.delete(name);
      } else {
        params.set(name, value);
      }
      router.push(pathname + "?" + params.toString());
    },
    [pathname, router, searchParams],
  );

  return (
    <>
      <div>
        <div className="flex">
          <Sidebar onChangeParams={onChangeParams} />
          <div className="m-auto flex max-w-screen-xl flex-1 flex-col overflow-hidden px-8">
            <Tags onChangeParams={onChangeParams} />
            <SortFilter onChangeParams={onChangeParams} />
            <ProjectList />
          </div>
        </div>
      </div>
      <Top />
    </>
  );
}
