'use client';

import type { ProjectItemType } from '@esnext/server';

import { useRef } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Icon } from '@iconify/react';

import { Button } from '~/components/ui/button';
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '~/components/ui/card';
import { Skeleton } from '~/components/ui/skeleton';

export type ProjectBoxProps = {
  item: ProjectItemType;
  className?: string;
};

export function ProjectSkeleton() {
  return (
    <Card className='w-full flex-auto space-y-5 p-4'>
      <Skeleton className='rounded-lg'>
        <div className='bg-default-300 h-24 rounded-lg'></div>
      </Skeleton>
      <div className='space-y-3'>
        <Skeleton className='w-3/5 rounded-lg'>
          <div className='bg-default-200 h-3 w-3/5 rounded-lg'></div>
        </Skeleton>
        <Skeleton className='w-4/5 rounded-lg'>
          <div className='bg-default-200 h-3 w-4/5 rounded-lg'></div>
        </Skeleton>
        <Skeleton className='w-2/5 rounded-lg'>
          <div className='bg-default-300 h-3 w-2/5 rounded-lg'></div>
        </Skeleton>
      </div>
    </Card>
  );
}

export default function ProjectBox(props: ProjectBoxProps) {
  const { item, className } = props;
  const router = useRouter();
  const imgRef = useRef<HTMLImageElement>(null);

  const onPushDetail = () => {
    router.push(`/info/${item.name.toLocaleLowerCase()}`);
  };

  const onClick = () => {
    onPushDetail();
  };

  const linkToGithub = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    window.open(`https://github.com/${item.fullName}`);
  };

  return (
    <Card
      onClick={onClick}
      className={`bg-card-primary h-full w-full cursor-pointer rounded-md  ${className}`}
    >
      <CardHeader className='flex-col'>
        <div className='flex w-full justify-start gap-3'>
          <div className='h-[40px] w-[40px]'>
            <Image
              alt='nextui logo'
              className='min-w-[40px]'
              height={40}
              width={40}
              ref={imgRef}
              src='https://lee-oss-1300118632.cos.ap-nanjing.myqcloud.com/obsidian/202310181428834.png'
            />
          </div>
          <div className='flex flex-col items-start'>
            <CardTitle>{item.name}</CardTitle>
            <div className='border-b-1 border-default-300 flex w-full items-center gap-3'>
              <div className='text-default-400 flex items-center'>
                <span className='text-xs'>120K</span>
                <Icon icon='material-symbols:star-outline' fontSize={12} />
              </div>
              <div className='text-default-400 flex items-center'>
                <span className='text-xs'>1220M&nbsp;·&nbsp;week</span>
                <Icon icon='material-symbols:download' fontSize={12} />
              </div>
              <div className='text-default-400 flex items-center'>
                <span className='text-xs'>Created 10 years ago</span>
              </div>
            </div>
          </div>
        </div>
        <CardDescription>{item.description}</CardDescription>
      </CardHeader>
      <CardFooter className='relative overflow-hidden'>
        <div className='mt-auto flex flex-row items-center justify-start gap-2'>
          <Button
            variant='outline'
            size='sm'
            className='dark:hover:bg-card dark:border-[hsl(0,0%,28%)]'
          >
            React
          </Button>
          <Button
            variant='outline'
            size='sm'
            className='dark:hover:bg-card dark:border-[hsl(0,0%,28%)]'
          >
            Zod
          </Button>
          <Button
            variant='outline'
            size='sm'
            className='dark:hover:bg-card dark:border-[hsl(0,0%,28%)]'
          >
            Vue
          </Button>
        </div>
        {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events */}
        <div
          onClick={linkToGithub}
          className='transition-background hover:bg-accent absolute -bottom-1 -right-1 flex items-center justify-center rounded-md p-2'
        >
          <Icon icon='mdi:github' fontSize={24} />
        </div>
      </CardFooter>
    </Card>
  );
}
