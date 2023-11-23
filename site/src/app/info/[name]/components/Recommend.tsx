import Image from 'next/image';
import Link from 'next/link';

const RecommendCard = () => {
  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events
    <Link
      href='/'
      className='grid max-w-full cursor-pointer grid-cols-[60px_1fr] gap-2'
    >
      <Image
        width={60}
        height={60}
        className='projectBoxImage col-span-1 row-span-2 rounded-lg'
        src='https://lee-oss-1300118632.cos.ap-nanjing.myqcloud.com/obsidian/202310091757604.jpg'
        alt=''
      />
      <p className='col-span-1 text-sm'>Static</p>
      <p className='text-muted-foreground col-span-1 line-clamp-2 h-[32px] max-w-full text-xs'>
        Boost.space tech stack Were aware of 11 technologies that tech stack Ne
        Recent launches cloud
      </p>
    </Link>
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
