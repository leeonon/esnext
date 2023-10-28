import { Image } from '@nextui-org/react';
import NextImage from 'next/image';
import { useRouter } from 'next/navigation';

const RecommendCard = () => {
  const router = useRouter();

  const onClick = () => {
    router.push(`/info/react`);
  };

  return (
    <div
      className='grid max-w-full cursor-pointer grid-cols-[60px_1fr]'
      onClick={onClick}
    >
      <Image
        as={NextImage}
        isBlurred
        width={60}
        height={60}
        radius='lg'
        classNames={{
          wrapper: 'col-span-1 row-span-2',
        }}
        className='projectBoxImage'
        src='https://lee-oss-1300118632.cos.ap-nanjing.myqcloud.com/obsidian/202310091757604.jpg'
        alt=''
      />
      <p className='col-span-1 text-sm'>Static</p>
      <p className='col-span-1 line-clamp-2 h-[32px] max-w-full text-xs text-default-400'>
        Boost.space tech stack Were aware of 11 technologies that tech stack Ne
        Recent launches cloud
      </p>
    </div>
  );
};

const Recommend = () => {
  return (
    <div className='border-none border-opacity-0 bg-transparent'>
      <div>
        <p className='text-tiny font-bold uppercase'>Recommend</p>
      </div>
      <div className='mt-4 flex max-w-full flex-col gap-4'>
        <RecommendCard />
        <RecommendCard />
        <RecommendCard />
        <RecommendCard />
        <RecommendCard />
      </div>
    </div>
  );
};

export default Recommend;
