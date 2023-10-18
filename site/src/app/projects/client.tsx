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
      <div className="flex w-full flex-col ">
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
