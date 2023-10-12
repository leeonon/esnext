import type { GetServerSidePropsContext } from "next";

import { Icon } from "@iconify/react";
import { Card, CardBody, Tab, Tabs } from "@nextui-org/react";
import Head from "next/head";
import { useParams } from "next/navigation";

import ProjectBaseInfo from "~/components/Info/Base";
import ProjectOverview from "~/components/Info/Overview";
import { api } from "~/utils/api";

export default function ProjectInfo() {
  const name = useParams().name as string;
  const { error, data, isLoading } = api.project.detail.useQuery(name, {
    refetchOnWindowFocus: false,
  });

  if (error) {
    return <div>Error</div>;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-screen-xl py-8">
      <Head>
        <title>ESNext - {name}</title>
      </Head>
      <ProjectBaseInfo project={data} />
      <div className="mt-3 flex gap-2">
        <div className="flex-1">
          <Tabs aria-label="Options" variant="light" color="secondary">
            <Tab
              key="photos"
              title={
                <div className="flex items-center space-x-2">
                  <Icon
                    icon="material-symbols:text-snippet-rounded"
                    fontSize={18}
                  />
                  <span>Overview</span>
                </div>
              }
            >
              <Card radius="sm">
                <CardBody className="p-0">
                  <ProjectOverview readme={data.readme?.content} />
                </CardBody>
              </Card>
            </Tab>
            <Tab key="music" title="Music">
              Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur.
            </Tab>
            <Tab key="videos" title="Videos">
              Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
              officia deserunt mollit anim id est laborum.
            </Tab>
          </Tabs>
        </div>
        <Card title="Links" className="mt-[3.2rem] h-fit">
          <CardBody className="h-fit w-[250px]">Links</CardBody>
        </Card>
      </div>
    </div>
  );
}

export const getServerSideProps = (context: GetServerSidePropsContext) => {
  const { query } = context;
  const { name } = query;
  if (!name) {
    return { redirect: { destination: "/404" } };
  }

  return {
    props: {},
  };
};
