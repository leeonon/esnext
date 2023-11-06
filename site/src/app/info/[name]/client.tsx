'use client';

import { useMemo } from 'react';
import { notFound, useParams } from 'next/navigation';
import { Icon } from '@iconify/react';

import ProjectBaseInfo from '~/app/info/[name]/components/Base';
import NpmInfo from '~/app/info/[name]/components/NpmInfo';
import ProjectOverview from '~/app/info/[name]/components/Overview';
import Recommend from '~/app/info/[name]/components/Recommend';
import { ProjectInfoContext } from '~/app/info/[name]/context';
import ProjectTags from '~/components/Info/TagsCard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '~/components/ui/tabs';
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
            <Tabs defaultValue='overview'>
              <TabsList className='grid w-full grid-cols-3'>
                <TabsTrigger value='overview'>
                  <Title icon='material-symbols:text-snippet-rounded'>
                    OverView
                  </Title>
                </TabsTrigger>
                <TabsTrigger value='Trend'>
                  <Title icon='material-symbols:text-snippet-rounded'>
                    Trend
                  </Title>
                </TabsTrigger>
                <TabsTrigger value='dependencies'>
                  <Title icon='material-symbols:text-snippet-rounded'>
                    Dependencies
                  </Title>
                </TabsTrigger>
              </TabsList>
              <TabsContent value='overview'>
                <ProjectOverview readme={data?.readme?.content} />
              </TabsContent>
              <TabsContent value='compare'>
                <div className='flex h-[300px] items-center justify-center'>
                  <i>⚠️</i>
                  <span>
                    We&lsquo;re working hard to bring this feature to you. Stay
                    tuned!
                  </span>
                </div>
              </TabsContent>
              <TabsContent value='dependencies'>dependencies</TabsContent>
              <TabsContent value='devDependencies'>devDependencies</TabsContent>
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
