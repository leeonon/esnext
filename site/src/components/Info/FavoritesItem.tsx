'use client';

import type { UserFavoritesItemType } from '@esnext/server';
import type { FC } from 'react';

import { memo } from 'react';
import { Avatar, AvatarGroup, Checkbox } from '@nextui-org/react';

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
      className='border-1 border-default-300 transition-transform-colors hover:bg-default-200 flex cursor-pointer items-center justify-between rounded-md p-3'
      onClick={handleCheck}
    >
      <div className='flex flex-col gap-1'>
        <div className='font-bold'>{item.name}</div>
        {item.description && (
          <div className='text-default-400 text-xs'>{item.description}</div>
        )}
        <AvatarGroup
          size='sm'
          isBordered
          max={3}
          total={10}
          className='mt-2 justify-start'
        >
          <Avatar src='https://i.pravatar.cc/150?u=a042581f4e29026024d' />
          <Avatar src='https://i.pravatar.cc/150?u=a042581f4e29026024d' />
          <Avatar src='https://i.pravatar.cc/150?u=a042581f4e29026024d' />
          <Avatar src='https://i.pravatar.cc/150?u=a042581f4e29026024d' />
        </AvatarGroup>
      </div>
      <Checkbox isSelected={isChecked} onChange={handleCheck} />
    </div>
  );
};

export default memo(FavoritesItem);
