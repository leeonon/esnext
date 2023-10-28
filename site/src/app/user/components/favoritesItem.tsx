'use client';

import { Icon } from '@iconify/react';
import {
  Avatar,
  AvatarGroup,
  Button,
  Card,
  CardBody,
  CardFooter,
  Divider,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from '@nextui-org/react';

export default function FavoritesItem() {
  return (
    <Card className='max-w-[560px] rounded-md' isFooterBlurred isHoverable>
      <CardBody>
        <div className='mb-4 flex items-center justify-between'>
          <div className='font-mono font-semibold'>Ui Design</div>
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
        <AvatarGroup
          size='sm'
          isBordered
          max={6}
          total={10}
          className='justify-start'
        >
          <Avatar src='https://i.pravatar.cc/150?u=a042581f4e29026024d' />
          <Avatar src='https://i.pravatar.cc/150?u=a042581f4e29026024d' />
          <Avatar src='https://i.pravatar.cc/150?u=a042581f4e29026024d' />
          <Avatar src='https://i.pravatar.cc/150?u=a042581f4e29026024d' />
          <Avatar src='https://i.pravatar.cc/150?u=a042581f4e29026024d' />
          <Avatar src='https://i.pravatar.cc/150?u=a042581f4e29026024d' />
          <Avatar src='https://i.pravatar.cc/150?u=a042581f4e29026024d' />
          <Avatar src='https://i.pravatar.cc/150?u=a042581f4e29026024d' />
          <Avatar src='https://i.pravatar.cc/150?u=a042581f4e29026024d' />
        </AvatarGroup>
      </CardBody>
      <Divider />
      <CardFooter className='p-2'>
        <p className='line-clamp-2 text-left font-sans text-small leading-4 text-default-400'>
          This issue is caused by the endOfLine rule in prettier. The end of
          line can be LF, CR, or CRLF. The error message relates to this issue
        </p>
      </CardFooter>
    </Card>
  );
}
