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

type FavoritesItemProps = {
  item: UserFavoritesItemType;
  onEdit: (item: UserFavoritesItemType) => void;
  onRemove: (item: UserFavoritesItemType) => void;
};

export default function FavoritesItem({
  item,
  onEdit,
  onRemove,
}: FavoritesItemProps) {
  const onAction = (key: React.Key) => {
    if (key === 'edit') {
      onEdit(item);
    }
    if (key === 'delete') {
      onRemove(item);
    }
  };
  return (
    <Card
      className='h-[160px] max-w-[560px] cursor-pointer rounded-md'
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
            <DropdownMenu aria-label='Edit Favorites Item' onAction={onAction}>
              <DropdownItem key='edit'>Edit</DropdownItem>
              <DropdownItem key='delete' className='text-danger' color='danger'>
                Delete
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
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
      </CardBody>
      <CardFooter className='p-2'>
        <p className='line-clamp-2 text-left font-sans text-small leading-4 text-default-400'>
          {item.description ?? '-'}
        </p>
      </CardFooter>
    </Card>
  );
}
