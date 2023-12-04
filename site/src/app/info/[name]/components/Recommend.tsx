import type { ProjectDetailType } from '@esnext/server';

import Image from 'next/image';
import Link from 'next/link';

type RecommendCardType = ProjectDetailType['similarProjects'][number];

const RecommendCard = ({ item }: { item: RecommendCardType }) => {
  return (
    <Link
      href={`/info/${item.name}/overview`}
      className='grid max-w-full cursor-pointer grid-cols-[60px_1fr] gap-2'
    >
      <Image
        width={50}
        height={50}
        className='projectBoxImage col-span-1 row-span-2 rounded-lg'
        src={item.ownerAvatarUrl || ''}
        alt=''
      />
      <p className='col-span-1 text-sm'>{item.name}</p>
      <p className='text-muted-foreground col-span-1 line-clamp-2 h-[32px] max-w-full text-xs'>
        {item.description}
      </p>
    </Link>
  );
};

const Recommend = ({ list }: { list: RecommendCardType[] }) => {
  if (!list || list.length === 0) {
    return;
  }
  return (
    <div className='border-none border-opacity-0 bg-transparent'>
      <div>
        <p className='text-tiny font-bold uppercase'>Recommend</p>
      </div>
      <div className='mt-4 flex max-w-full flex-col gap-4'>
        {list.map((item) => (
          <RecommendCard item={item} key={item.id} />
        ))}
      </div>
    </div>
  );
};

export default Recommend;
