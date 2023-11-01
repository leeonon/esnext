'use client';

import type { ProjectItemType } from '@esnext/server';

import { useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Icon } from '@iconify/react';
import { Card, CardBody, CardHeader, Image, Skeleton } from '@nextui-org/react';

import ESNextTag from '~/components/Tag';

export type ProjectBoxProps = {
  item: ProjectItemType;
  className?: string;
  cover?: string;
};

export function ProjectSkeleton() {
  return (
    <Card
      className='w-full flex-auto space-y-5 p-4 sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/4'
      radius='sm'
    >
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
  const { item, className, cover } = props;
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
      isPressable
      onClick={onClick}
      className={`w-full rounded-md ${className} hover:bg-default-100 cursor-pointer`}
    >
      <CardHeader className='flex-col'>
        <div className='flex w-full justify-start gap-3'>
          <div className='h-[40px] w-[40px]'>
            <Image
              isBlurred
              alt='nextui logo'
              className='min-w-[40px]'
              height={40}
              width={40}
              radius='sm'
              ref={imgRef}
              src='https://lee-oss-1300118632.cos.ap-nanjing.myqcloud.com/obsidian/202310181428834.png'
            />
          </div>
          <div className='flex flex-col items-start'>
            <p className='text-md font-bold'>{item.name}</p>
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
        <p className='text-small mt-2 line-clamp-2 text-left'>
          {item.description}
        </p>
      </CardHeader>
      <CardBody className='relative overflow-hidden p-2'>
        {cover ? (
          <Image
            src={cover}
            width='100%'
            height='100%'
            alt={item.fullName}
            className='my-2 h-[170px] max-w-full rounded-sm object-cover'
          />
        ) : null}
        <div className='mt-auto flex flex-row items-center justify-start gap-2'>
          <ESNextTag>React</ESNextTag>
          <ESNextTag>Vue</ESNextTag>
          <ESNextTag>TypeScript</ESNextTag>
        </div>
        {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events */}
        <div
          onClick={linkToGithub}
          className='bg-default-100 transition-background hover:bg-primary absolute -bottom-1 -right-1 flex items-center justify-center rounded-md p-2'
        >
          <Icon icon='mdi:github' fontSize={24} />
        </div>
      </CardBody>
    </Card>
  );
}
