'use client';

import { Icon } from '@iconify/react';

import { Input } from '~/components/ui/input';

export default function Search() {
  return (
    <div className='border-1 border-default-100 mt-8 flex w-4/5 items-center overflow-hidden rounded-full border-solid'>
      <Input
        placeholder='Try searching for what you want'
        // startContent={
        //   <Icon icon='carbon:search' fontSize={26} className='m-2' />
        // }
      />
    </div>
  );
}
