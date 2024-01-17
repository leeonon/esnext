import type { Metadata } from 'next';

import ProjectBaseInfo from '~/app/info/[name]/components/Base';
import NpmInfo from '~/app/info/[name]/components/NpmInfo';
import Recommend from '~/app/info/[name]/components/Recommend';
import ProjectTags from '~/components/Info/TagsCard';
import { api } from '~/trpc/server';

import InfoContext from './components/Context';

// import { LayoutTabs } from './components/Tabs';

type Props = {
  params: { name: string };
  searchParams: Record<string, string | string[] | undefined>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return Promise.resolve({
    title: `ESNext - ${params.name}`,
  });
}

export default async function InfoLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { name: string };
}) {
  const { name } = params;
  const data = await api.project.detail.query(name);

  const topics = data.topics ? data.topics?.split(',') ?? [] : [];

  return (
    <section className='m-auto max-w-screen-2xl px-8'>
      <div className='max-w-screen-xl py-8'>
        <ProjectBaseInfo project={data} />
        <div className='mt-3 flex gap-2'>
          <div className='flex-1'>
            <InfoContext project={data}>{children}</InfoContext>
          </div>
          <div className='flex w-[250px] flex-col gap-4'>
            <ProjectTags tags={topics} />
            <NpmInfo project={data} />
            <Recommend list={data.similarProjects} />
          </div>
        </div>
      </div>
    </section>
  );
}
