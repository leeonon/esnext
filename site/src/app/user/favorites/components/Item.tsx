import type { UserFavoritesItemType } from '@esnext/server';
import type { MouseEventHandler } from 'react';

import { useCallback } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Icon } from '@iconify/react';

import { Button } from '~/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '~/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '~/components/ui/dropdown-menu';

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
  const router = useRouter();

  const onClick = () => {
    router.push(`/user/favorites/${encodeURIComponent(item.name)}`);
  };

  const avatars = item.projects.slice(0, 5).filter(Boolean);

  const handleEdit: MouseEventHandler<HTMLDivElement> = useCallback(
    (e) => {
      e.stopPropagation();
      onEdit(item);
    },
    [item, onEdit],
  );

  const handleDelete: MouseEventHandler<HTMLDivElement> = useCallback(
    (e) => {
      e.stopPropagation();
      onRemove(item);
    },
    [item, onRemove],
  );

  return (
    <Card
      className='bg-card-primary hover:bg-card flex h-[180px] max-w-[560px] cursor-pointer flex-col rounded-md transition-colors'
      onClick={onClick}
    >
      <CardHeader className='flex flex-row items-center justify-between overflow-hidden'>
        <CardTitle>{item.name}</CardTitle>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Button size='sm' variant='outline'>
              <Icon icon='iconamoon:options' />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={handleEdit}>Edit</DropdownMenuItem>
            <DropdownMenuItem onClick={handleDelete}>Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>
      <CardContent className='flex h-[40px] items-center py-0'>
        <div className='flex items-center justify-start gap-2'>
          {avatars.map((project) => (
            <Image
              width={35}
              height={35}
              className='rounded-sm'
              key={project.id}
              src={project.ownerAvatarUrl ?? ''}
              alt={project.name}
            />
          ))}
        </div>
      </CardContent>
      <CardFooter className='mt-4 px-4'>
        <CardDescription className='line-clamp-2 text-left text-xs leading-4'>
          {item.description ?? '-'}
        </CardDescription>
      </CardFooter>
    </Card>
  );
}
