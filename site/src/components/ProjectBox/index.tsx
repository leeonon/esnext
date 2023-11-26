/* eslint-disable jsx-a11y/click-events-have-key-events */
'use client';

import type { ProjectItemType } from '@esnext/server';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Icon } from '@iconify/react';
import throttle from 'lodash/throttle';

import { Button } from '~/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '~/components/ui/card';
import { Skeleton } from '~/components/ui/skeleton';
import dayjs from '~/lib/dayjs';
import { cn, num2k } from '~/lib/utils';

import S from './index.module.css';

export type ProjectBoxProps = {
  item: ProjectItemType;
  onChangeParams: (name: string, value: string, isDelete?: boolean) => void;
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
  const { item, className, onChangeParams } = props;
  const router = useRouter();
  const imgRef = useRef<HTMLImageElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onMouseMove = throttle((e: MouseEvent) => {
      if (!cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      cardRef.current.style.setProperty('--x', `${e.clientX - rect.left}px`);
      cardRef.current.style.setProperty('--y', `${e.clientY - rect.top}px`);
    }, 50);

    document.addEventListener('mousemove', onMouseMove);

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
    };
  }, []);

  const onPushDetail = () => {
    router.push(`/info/${item.name.toLocaleLowerCase()}/overview`);
  };

  const onClick = () => {
    onPushDetail();
  };

  const linkToGithub = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    window.open(`https://github.com/${item.fullName}`);
  };
  const linkToHome = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    window.open(item.homepage!);
  };

  const topics = item.topics ? item.topics?.split(',').slice(0, 3) || [] : [];

  return (
    <div
      onClick={onClick}
      ref={cardRef}
      className={cn(S.project_box, item.cover ? 'row-span-2' : '')}
    >
      <Card
        onClick={onClick}
        ref={cardRef}
        className={cn(
          'bg-card-primary group relative h-full w-full cursor-pointer overflow-hidden rounded-md',
          className,
        )}
      >
        <CardHeader className='flex-col'>
          <div className='flex w-full justify-start gap-3'>
            <div className='h-[50px] w-[50px]'>
              <Image
                className='min-w-[50px] rounded-md'
                height={40}
                width={40}
                ref={imgRef}
                alt={item.name}
                src={item.ownerAvatarUrl}
              />
            </div>
            <div className='flex flex-col items-start justify-around'>
              <CardTitle>{item.name}</CardTitle>
              <div className='border-b-1 border-default-300 flex w-full items-center gap-3'>
                <div className='flex items-center'>
                  <span className='text-xs'>{num2k(item.stargazersCount)}</span>
                  <Icon icon='material-symbols:star-outline' fontSize={12} />
                </div>
                <div className='flex items-center'>
                  <span className='text-xs'>
                    {Number(item.weeklyDownloads).toLocaleString()}
                    &nbsp;·&nbsp;Weekly Downloads
                  </span>
                  <Icon icon='material-symbols:download' fontSize={12} />
                </div>
                <div className='flex items-center'>
                  <span className='text-xs'>
                    Created by {dayjs(item.createdAt).fromNow()}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className='p-0'>
          {item.cover ? (
            <Image width={1280} height={800} alt={item.name} src={item.cover} />
          ) : null}
          <CardDescription className='my-2 line-clamp-2 px-6'>
            {item.description}
          </CardDescription>
        </CardContent>
        <CardFooter>
          <div className='mt-auto flex flex-row items-center justify-start gap-2'>
            {topics.map((keyword) => (
              <Button
                key={keyword}
                onClick={(e) => {
                  e.stopPropagation();
                  onChangeParams('keywords', keyword);
                }}
                variant='outline'
                size='sm'
                className='dark:hover:bg-card dark:border-[hsl(0,0%,28%)]'
              >
                {keyword}
              </Button>
            ))}
          </div>
        </CardFooter>
        <div className='absolute bottom-0 right-0 ml-auto flex items-center justify-end gap-1 opacity-0 transition duration-300 group-hover:opacity-100'>
          {item.homepage && (
            <div
              onClick={linkToHome}
              className='transition-background hover:bg-accent flex items-center justify-center rounded-md p-2'
            >
              <Icon icon='material-symbols:home-outline' fontSize={24} />
            </div>
          )}
          <div
            onClick={linkToGithub}
            className='transition-background hover:bg-accent flex items-center justify-center rounded-md p-2'
          >
            <Icon icon='mdi:github' fontSize={24} />
          </div>
        </div>
      </Card>
    </div>
  );
}
