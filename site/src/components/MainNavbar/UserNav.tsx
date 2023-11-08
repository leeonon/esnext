/* eslint-disable jsx-a11y/click-events-have-key-events */
'use client';

// https://juejin.cn/post/7155514465591984136#heading-14
import { useRouter } from 'next/navigation';
import { PersonIcon } from '@radix-ui/react-icons';
import { signIn, signOut, useSession } from 'next-auth/react';

import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar';
import { Button } from '~/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '~/components/ui/dropdown-menu';
import { api } from '~/trpc/react';

export function UserNav() {
  const { data: sessionData } = useSession();
  const router = useRouter();

  const { data: userInfo } = api.user.userInfo.useQuery(undefined, {
    enabled: sessionData?.user !== undefined,
    refetchOnWindowFocus: false,
  });

  if (!userInfo) {
    return (
      <div
        onClick={() => void signIn()}
        className='bg-card relative flex h-8 w-8 cursor-pointer items-center justify-center rounded-full'
      >
        <PersonIcon className='h-[18px] w-[18px]' />
      </div>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='ghost' className='relative h-8 w-8 rounded-full'>
          <Avatar className='h-8 w-8'>
            <AvatarImage src={userInfo.image ?? ''} alt='name' />
            <AvatarFallback>Name</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-56' align='end' forceMount>
        <DropdownMenuLabel className='font-normal'>
          <div className='flex flex-col space-y-1'>
            <p className='text-sm font-medium leading-none'>{userInfo.name}</p>
            <p className='text-muted-foreground text-xs leading-none'>
              {userInfo.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={() => router.push('/user/favorites')}>
            My Favorites
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => router.push('/user/stars')}>
            My Stars
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => void signOut()}>
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
