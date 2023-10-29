'use client';

import type { UserFavoritesItemType } from '~/types/api';

import { Icon } from '@iconify/react';
import {
  Avatar,
  AvatarGroup,
  Button,
  Card,
  CardBody,
  CardFooter,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from '@nextui-org/react';
import { useMemo } from 'react';

type FavoritesItemProps = {
  item: UserFavoritesItemType;
};

export default function FavoritesItem({ item }: FavoritesItemProps) {
  const avatarGroup = useMemo(() => {
    if (!item.projects.length) {
      return null;
    }

    return (
      <AvatarGroup
        size='sm'
        isBordered
        max={6}
        total={item.projects.length}
        className='justify-start'
      >
        {item.projects.map((project) => (
          <Avatar key={project.id} src={project.logo ?? ''} />
        ))}
      </AvatarGroup>
    );
  }, [item.projects]);

  return (
    <Card
      className='max-w-[560px] cursor-pointer rounded-md'
      isFooterBlurred
      isHoverable
    >
      <CardBody>
        <div className='mb-4 flex items-center justify-between'>
          <div className='font-mono font-semibold'>{item.name}</div>
          <Dropdown>
            <DropdownTrigger>
              <Button isIconOnly size='sm' variant='light'>
                <Icon icon='iconamoon:options' />
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              aria-label='Edit Favorites Item'
              onAction={(key) => alert(key)}
            >
              <DropdownItem key='edit'>Edit</DropdownItem>
              <DropdownItem key='delete' className='text-danger' color='danger'>
                Delete file
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
        {avatarGroup}
      </CardBody>
      <CardFooter className='p-2'>
        <p className='line-clamp-2 text-left font-sans text-small leading-4 text-default-400'>
          {item.description ?? '-'}
        </p>
      </CardFooter>
    </Card>
  );
}
