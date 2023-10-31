'use client';

import { useMemo } from 'react';
import { notFound, useParams } from 'next/navigation';
import { Icon } from '@iconify/react';
import { Tab, Tabs } from '@nextui-org/react';

import { ProjectInfoContext } from '~/app/info/[name]/context';
import ProjectBaseInfo from '~/components/Info/Base';
import NpmInfo from '~/components/Info/NpmInfo';
import ProjectOverview from '~/components/Info/Overview';
import Recommend from '~/components/Info/Recommend';
import ProjectTags from '~/components/Info/TagsCard';
import { api } from '~/trpc/react';

const Title = ({
  children,
  icon,
}: {
  children: React.ReactNode;
  icon: string;
}) => (
  <div className='flex items-center space-x-2'>
    <Icon icon={icon} fontSize={18} />
    <span>{children}</span>
  </div>
);

export default function ProjectInfo() {
  const name = useParams().name as string;
  const { error, data, isLoading, refetch, isError } =
    api.project.detail.useQuery(name, {
      refetchOnWindowFocus: false,
      retry: false,
    });

  const contextValue = useMemo(() => {
    return {
      project: data,
      onRefresh: () => refetch(),
    };
  }, [data, refetch]);

  if (isError && error?.data?.httpStatus === 404) {
    notFound();
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <ProjectInfoContext.Provider value={contextValue}>
      <div className='max-w-screen-xl py-8'>
        <ProjectBaseInfo />
        <div className='mt-3 flex gap-2'>
          <div className='flex-1'>
            <Tabs aria-label='Options' variant='light' color='secondary'>
              <Tab
                key='photos'
                title={
                  <Title icon='material-symbols:text-snippet-rounded'>
                    OverView
                  </Title>
                }
              >
                <ProjectOverview readme={data?.readme?.content} />
              </Tab>
              <Tab
                key='trend'
                defaultChecked
                title={<Title icon='material-symbols:compare'>Compare</Title>}
              >
                <div className='flex h-[300px] items-center justify-center'>
                  <i>⚠️</i>
                  <span>
                    We&lsquo;re working hard to bring this feature to you. Stay
                    tuned!
                  </span>
                </div>
              </Tab>
            </Tabs>
          </div>
          <div className='mt-[3.2rem] flex w-[250px] flex-col gap-4'>
            <ProjectTags tags={data?.tags} />
            <NpmInfo project={data} />
            <Recommend />
          </div>
        </div>
      </div>
    </ProjectInfoContext.Provider>
  );
}
