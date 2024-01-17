'use client';

import type { ProjectDetailType } from '@esnext/server';

import { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { redirect } from 'next/navigation';
import { Icon } from '@iconify/react';
import { toast } from 'sonner';

import FavoritesModal from '~/components/FavoritesModal';
import { Button } from '~/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '~/components/ui/dialog';
import { Input } from '~/components/ui/input';
import { useDisclosure } from '~/hooks/useDisclosure';
import { api } from '~/trpc/react';

import FavoritesItem from './FavoritesItem';

const FavoritesButton = ({
  project,
  onRefresh,
}: {
  project: ProjectDetailType;
  onRefresh?: () => void;
}) => {
  const [checkedKeys, setCheckedKeys] = useState<Set<number>>(new Set([]));
  const { isOpen, onOpen, onClose, onToggle } = useDisclosure();
  const disclosure = useDisclosure();
  const {
    data: userFavorites,
    refetch,
    isError,
    error,
  } = api.user.userFavorites.useQuery(undefined, {
    refetchOnWindowFocus: false,
    enabled: isOpen,
    retry: false,
  });

  if (isError && error?.data?.httpStatus === 401) {
    redirect('/login');
  }

  const collectionProject = api.project.collection.useMutation({
    onSuccess: () => {
      onClose();
      toast.success('Collection project successfully', {
        position: 'top-center',
      });
      // This will refetch this project info
      onRefresh && onRefresh();
    },
    onError: (err) => {
      toast.error(err.message, { position: 'top-center' });
    },
  });

  useEffect(() => {
    if (userFavorites) {
      const next = new Set<number>();
      userFavorites.forEach((favorite) => {
        if (favorite.projects.some((p) => p.id === project?.id)) {
          next.add(favorite.id);
        }
      });
      setCheckedKeys(next);
    }
  }, [project?.id, userFavorites]);

  const onCheck = useCallback((id: number) => {
    setCheckedKeys((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }, []);

  const itemList = useMemo(() => {
    if (userFavorites && userFavorites.length > 0) {
      return userFavorites.map((favorite: (typeof userFavorites)[number]) => (
        <FavoritesItem
          key={favorite.id}
          item={favorite}
          isChecked={checkedKeys.has(favorite.id)}
          onCheck={onCheck}
        />
      ));
    }
    return (
      <div className='h-30 flex items-center justify-center'>
        Haven created favorites yet
      </div>
    );
  }, [checkedKeys, onCheck, userFavorites]);

  const onOk = useCallback(() => {
    if (!project) return;
    collectionProject.mutate({
      favoriteIds: Array.from(checkedKeys),
      projectId: project.id,
    });
  }, [checkedKeys, collectionProject, project]);

  return (
    <div>
      <Dialog open={isOpen} onOpenChange={onToggle}>
        <DialogTrigger asChild>
          <Button
            onClick={onOpen}
            color={project?.isCollection ? 'secondary' : 'default'}
          >
            <Icon icon='material-symbols:bookmark-add-outline' fontSize={22} />
          </Button>
        </DialogTrigger>
        <DialogContent className='sm:max-w-[425px]'>
          <DialogHeader>
            <DialogTitle>Collection</DialogTitle>
          </DialogHeader>
          <Input placeholder='Search' />
          <div className='scrollbar-none flex max-h-[400px] flex-col gap-2 overflow-y-scroll'>
            {itemList}
          </div>
          <DialogFooter>
            <FavoritesModal
              disclosure={disclosure}
              onSuccess={() => {
                void refetch();
              }}
            />
            <Button variant='outline' onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={onOk}>Done</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default memo(FavoritesButton);
