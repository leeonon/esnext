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
      <div className='flex w-full flex-col items-center bg-default-50 px-8 sm:px-16'>
        <div className='mb-5 flex w-full max-w-screen-lg flex-1 flex-col-reverse  flex-wrap items-start border-b-1 border-default-200 py-8 sm:flex-row sm:flex-nowrap'>
          <div className='flex w-full align-baseline sm:w-2/3'>
            <div className='flex w-1/2 flex-col justify-center'>
              <p className='font-medium text-default-600'>Navigation</p>
              <ul className='flex flex-col justify-center gap-2 text-sm text-default-500 '>
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
              <p className='font-medium text-default-600'>Navigation</p>
              <ul className='flex flex-col justify-center gap-2 text-sm text-default-500'>
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
        <p className='pb-5 text-default-600'>©2023 ESNext</p>
      </div>
    </div>
  );
}
