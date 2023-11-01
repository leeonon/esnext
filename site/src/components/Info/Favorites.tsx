'use client';

import { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { redirect } from 'next/navigation';
import { Icon } from '@iconify/react';
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from '@nextui-org/react';
import { toast } from 'sonner';

import { useProjectInfoContext } from '~/app/info/[name]/context';
import FavoritesModal from '~/components/FavoritesModal';
import { api } from '~/trpc/react';

import FavoritesItem from './FavoritesItem';

const FavoritesButton = () => {
  const { project, onRefresh } = useProjectInfoContext();
  const [checkedKeys, setCheckedKeys] = useState<Set<number>>(new Set([]));
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
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
  }, [userFavorites, project]);

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
      <Button
        isIconOnly
        size='md'
        onClick={onOpen}
        color={project?.isCollection ? 'secondary' : 'default'}
      >
        <Icon icon='material-symbols:bookmark-add-outline' fontSize={22} />
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement='top-center'>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className='flex flex-col gap-1'>
                Collection
              </ModalHeader>
              <ModalBody>
                <Input placeholder='Search' fullWidth />
                <div className='scrollbar-none flex max-h-[400px] flex-col gap-2 overflow-y-scroll'>
                  {itemList}
                </div>
              </ModalBody>
              <ModalFooter className='border-t-1 border-default-100'>
                <FavoritesModal
                  disclosure={disclosure}
                  onSuccess={() => {
                    void refetch();
                  }}
                />
                <Button color='danger' variant='flat' onPress={onClose}>
                  Cancel
                </Button>
                <Button color='primary' onClick={onOk}>
                  Done
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default memo(FavoritesButton);
