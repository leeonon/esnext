'use client';

import { useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Icon } from '@iconify/react';

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
    <div className='sticky top-[calc(4rem+1px)] w-[200px] self-start px-4 pt-10'>
      <ListBox value='profile' onSelect={onSelect}>
        <ListBoxItem value='favorites'>
          <Icon icon='icon-park-outline:weixin-favorites' fontSize={18} />
          <span>Favorites</span>
        </ListBoxItem>
        <ListBoxItem value='stars'>
          <Icon icon='material-symbols:star-outline-rounded' fontSize={20} />
          <span>Stars</span>
        </ListBoxItem>
      </ListBox>
    </div>
  );
}
