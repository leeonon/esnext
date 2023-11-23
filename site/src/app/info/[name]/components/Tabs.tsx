import Link from 'next/link';

import { Tabs, TabsList, TabsTrigger } from '~/components/ui/tabs';

const Title = ({ children }: { children: React.ReactNode; icon: string }) => (
  <div className='flex items-center space-x-2'>
    <span>{children}</span>
  </div>
);

export function LayoutTabs({ name }: { name: string }) {
  return (
    <Tabs defaultValue='overview' className='mb-4'>
      <TabsList className='grid w-full grid-cols-3'>
        <TabsTrigger value='overview' asChild>
          <Link href={`/info/${name}/overview`}>
            <Title icon='material-symbols:text-snippet-rounded'>OverView</Title>
          </Link>
        </TabsTrigger>
        <TabsTrigger value='Trend' asChild>
          <Link href={`/info/${name}/trend`}>
            <Title icon='material-symbols:text-snippet-rounded'>Trend</Title>
          </Link>
        </TabsTrigger>
        <TabsTrigger value='dependencies'>
          <Title icon='material-symbols:text-snippet-rounded'>
            Dependencies
          </Title>
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
}
