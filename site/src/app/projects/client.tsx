"use client";

import { useCallback, useState } from "react";

import ProjectList from "~/app/projects/list";
import Sidebar from "~/app/projects/sidebar";
import Tags from "~/app/projects/tags";
import Top from "~/components/Top";

export default function ProjectPage() {
  const [filterVisible, setFilterVisible] = useState(true);

  const onChangeFilterVisible = useCallback(() => {
    setFilterVisible((prev) => !prev);
  }, []);

  return (
    <>
      <div>
        <div className="flex">
          <Sidebar />
          {/* <div className="flex-auto">
            <Tags
              onChangeFilter={onChangeFilterVisible}
              categoryVisible={filterVisible}
            />
            <ProjectList />
          </div> */}
        </div>
      </div>
      <Top />
    </>
  );
}
