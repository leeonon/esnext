import type { GetServerSidePropsContext } from "next";

import { Icon } from "@iconify/react";
import { Tab, Tabs } from "@nextui-org/react";
import Head from "next/head";
import { useParams } from "next/navigation";

import ProjectBaseInfo from "~/components/Info/Base";
import NpmInfo from "~/components/Info/NpmInfo";
import ProjectOverview from "~/components/Info/Overview";
import Recommend from "~/components/Info/Recommend";
import ProjectTags from "~/components/Info/TagsCard";
import { api } from "~/utils/api";

const Title = ({
  children,
  icon,
}: {
  children: React.ReactNode;
  icon: string;
}) => (
  <div className="flex items-center space-x-2">
    <Icon icon={icon} fontSize={18} />
    <span>{children}</span>
  </div>
);

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
                <Title icon="material-symbols:text-snippet-rounded">
                  OverView
                </Title>
              }
            >
              <ProjectOverview readme={data?.readme?.content} />
            </Tab>
            <Tab
              key="trend"
              defaultChecked
              title={<Title icon="material-symbols:compare">Compare</Title>}
            >
              <div className="flex h-[300px] items-center justify-center">
                <i>⚠️</i>
                <span>
                  We&lsquo;re working hard to bring this feature to you. Stay
                  tuned!
                </span>
              </div>
            </Tab>
          </Tabs>
        </div>
        <div className="mt-[3.2rem] flex w-[250px] flex-col gap-4">
          <ProjectTags tags={data?.tags} />
          <NpmInfo />
          <Recommend />
        </div>
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
