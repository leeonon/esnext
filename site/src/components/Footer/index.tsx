'use client';

import { Icon } from '@iconify/react';
import { Button, Input } from '@nextui-org/react';

import { Logo2 } from '~/components/Logos';

export default function Footer() {
  return (
    <div className='mx-auto'>
      <div className='flex h-60 flex-col items-center'>
        <Icon
          icon='material-symbols:auto-awesome-rounded'
          className='text-4xl text-yellow-300'
        />
        <p className='mb-4'>
          Can&apos;t find the project you&apos;re looking for?
        </p>
        <Button
          color='secondary'
          startContent={<Icon icon='mdi:plus' fontSize='24' />}
        >
          Request new project
        </Button>
      </div>
      <div className='bg-default-50 flex w-full flex-col items-center px-8 sm:px-16'>
        <div className='border-b-1 border-default-200 mb-5 flex w-full max-w-screen-lg  flex-1 flex-col-reverse flex-wrap items-start py-8 sm:flex-row sm:flex-nowrap'>
          <div className='flex w-full align-baseline sm:w-2/3'>
            <div className='flex w-1/2 flex-col justify-center'>
              <p className='text-default-600 font-medium'>Navigation</p>
              <ul className='text-default-500 flex flex-col justify-center gap-2 text-sm '>
                <li>Blog</li>
                <li>Github</li>
                <li>About</li>
                <li>Project</li>
                <li>Blog</li>
                <li>Github</li>
                <li>About</li>
                <li>Project</li>
              </ul>
            </div>
            <div className='flex w-1/2 flex-col justify-center'>
              <p className='text-default-600 font-medium'>Navigation</p>
              <ul className='text-default-500 flex flex-col justify-center gap-2 text-sm'>
                <li>Blog</li>
                <li>Github</li>
                <li>About</li>
                <li>Project</li>
              </ul>
            </div>
          </div>
          <div className='mb-5 flex w-full flex-col justify-center overflow-hidden sm:w-1/3'>
            <Logo2 />
            <Input
              label='Email'
              color='secondary'
              variant='bordered'
              radius='sm'
              placeholder='you@example.com'
              className='mt-4'
              size='md'
              startContent={
                <Icon
                  icon='mdi:email'
                  fontSize={20}
                  className='text-default-500'
                />
              }
            ></Input>
            <Button radius='sm' className='mt-4 w-24'>
              Subscribe
            </Button>
          </div>
        </div>
        <p className='text-default-600'>Create by Leeonon</p>
        <p className='text-default-600 pb-5'>©2023 ESNext</p>
      </div>
    </div>
  );
}
