'use client';

import { useCallback } from 'react';
import { useRouter } from 'next/navigation';

import { ListBox, ListBoxItem } from '~/components/ListBox';

export default function Sidebar() {
  const router = useRouter();

  const onSelect = useCallback(
    (key: React.Key) => {
      router.push(`/user/${key}`);
    },
    [router],
  );

  return (
    <div className='bg-card sticky top-[calc(4rem+1px)] h-screen w-[200px] self-start border-r px-4 pt-4'>
      <ListBox value='info' onSelect={onSelect}>
        <ListBoxItem value='info'>User Info</ListBoxItem>
        <ListBoxItem value='favorites'>My Favorites</ListBoxItem>
        <ListBoxItem value='stars'>My Stars</ListBoxItem>
        <ListBoxItem value='loved'>My Loved</ListBoxItem>
      </ListBox>
    </div>
  );
}
