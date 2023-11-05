'use client';

import Image from 'next/image';

import { Card, CardContent } from '~/components/ui/card';

const PopularCard = ({ name, logo }: { name: string; logo: string }) => {
  return (
    <Card className='bg-card hover:bg-card-hover my-[7.5px] flex h-[160px] w-[160px] flex-none cursor-pointer transition-colors'>
      <CardContent className='flex max-h-none w-full max-w-none items-center justify-center border-none p-0'>
        <Image width={60} height={60} alt={name} src={`/logos/${logo}`}></Image>
      </CardContent>
    </Card>
  );
};

export default PopularCard;
