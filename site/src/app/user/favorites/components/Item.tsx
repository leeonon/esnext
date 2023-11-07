import type { UserFavoritesItemType } from '@esnext/server';

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
    alert('TODO: Navigate to favorites page');
    router.push(`/user/favorites/${encodeURIComponent(item.name)}`);
  };

  return (
    <Card
      className='hover:bg-accent flex max-w-[560px] cursor-pointer flex-col rounded-md transition-colors'
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
            <DropdownMenuItem onClick={() => onEdit(item)}>
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onRemove(item)}>
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>
      <CardContent>
        <div className='flex items-center justify-start gap-1'>
          {item.projects.map((project) => (
            <Image
              width={35}
              height={35}
              key={project.id}
              src={project.logo ?? ''}
              alt={project.name}
            />
          ))}
        </div>
      </CardContent>
      <CardFooter className='mt-auto p-2'>
        <CardDescription className='line-clamp-2 text-left text-xs leading-4'>
          {item.description ?? '-'}
        </CardDescription>
      </CardFooter>
    </Card>
  );
}
