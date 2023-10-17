"use client";

import { useCallback, useState } from "react";

import Categories from "~/app/projects/categories";
import ProjectList from "~/app/projects/list";
import Tags from "~/app/projects/tags";
import Top from "~/components/Top";

export default function ProjectPage() {
  const [filterVisible, setFilterVisible] = useState(true);

  const onChangeFilterVisible = useCallback(() => {
    setFilterVisible((prev) => !prev);
  }, []);

  return (
    <>
      <div className="mx-auto flex w-full max-w-screen-2xl flex-col px-5 md:px-10 lg:px-16">
        <Tags
          onChangeFilter={onChangeFilterVisible}
          categoryVisible={filterVisible}
        />
        <div className="flex">
          <Categories visible={filterVisible} />
          <ProjectList />
        </div>
      </div>
      <Top />
    </>
  );
}
