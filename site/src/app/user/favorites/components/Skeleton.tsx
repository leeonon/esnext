import { Card } from '~/components/ui/card';
import { Skeleton } from '~/components/ui/skeleton';

export default function SkeletonItem() {
  return (
    <Card className='max-w-[560px]  space-y-5 p-4'>
      <div className='flex justify-between'>
        <Skeleton className='h-6 w-3/5 rounded-full'></Skeleton>
        <Skeleton className='h-6 w-10 rounded-full'></Skeleton>
      </div>
      <div className='flex'>
        <Skeleton className='flex h-10 w-10 rounded-full' />
        <Skeleton className='flex h-10 w-10 -translate-x-4 rounded-full' />
        <Skeleton className='flex h-10 w-10 -translate-x-8 rounded-full' />
        <Skeleton className='flex h-10 w-10 -translate-x-12 rounded-full' />
        <Skeleton className='flex h-10 w-10 -translate-x-16 rounded-full' />
      </div>
      <div className='space-y-3'>
        <Skeleton className='h-3 w-3/5 rounded-lg'></Skeleton>
        <Skeleton className='h-3 w-4/5 rounded-lg'></Skeleton>
      </div>
    </Card>
  );
}
