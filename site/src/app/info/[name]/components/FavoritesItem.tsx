'use client';

import type { UserFavoritesItemType } from '@esnext/server';
import type { FC } from 'react';

import { memo } from 'react';

import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar';
import { Checkbox } from '~/components/ui/checkbox';

export interface FavoritesItemProps {
  item: UserFavoritesItemType;
  isChecked: boolean;
  onCheck: (id: number) => void;
}

const FavoritesItem: FC<FavoritesItemProps> = ({
  item,
  isChecked,
  onCheck,
}) => {
  const handleCheck = () => onCheck(item.id);

  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events
    <div
      className='transition-transform-colors bg-card hover:bg-accent flex cursor-pointer items-center justify-between rounded-md border p-3'
      onClick={handleCheck}
    >
      <div className='flex flex-col gap-1'>
        <div className='font-bold'>{item.name}</div>
        {item.description && (
          <div className='text-default-400 text-xs'>{item.description}</div>
        )}
        <div className='item-center mt-2 flex justify-start'>
          <Avatar>
            <AvatarImage src='https://i.pravatar.cc/150?u=a042581f4e29026024d' />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <Avatar>
            <AvatarImage src='https://i.pravatar.cc/150?u=a042581f4e29026024d' />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <Avatar>
            <AvatarImage src='https://i.pravatar.cc/150?u=a042581f4e29026024d' />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <Avatar>
            <AvatarImage src='https://i.pravatar.cc/150?u=a042581f4e29026024d' />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <Avatar>
            <AvatarImage src='https://i.pravatar.cc/150?u=a042581f4e29026024d' />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>
      </div>
      <Checkbox checked={isChecked} onChange={handleCheck} />
    </div>
  );
};

export default memo(FavoritesItem);
