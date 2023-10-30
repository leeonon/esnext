'use client';

import type { useDisclosure } from '@nextui-org/react';
import type { UserFavoritesItemType } from '~/types/api';
import type { FC } from 'react';

import {
  Button,
  Checkbox,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Textarea,
} from '@nextui-org/react';
import { api } from '~/trpc/react';
import { isValidElement, memo, useEffect, useState } from 'react';
import { toast } from 'sonner';

import { useImmer } from '~/hooks/useImmer';

type UseDisclosureReturn = ReturnType<typeof useDisclosure>;

interface FavoritesModalProps {
  onSuccess: () => void;
  disclosure: UseDisclosureReturn;
  title?: React.ReactNode;
  item?: UserFavoritesItemType;
}
const FavoritesModal: FC<FavoritesModalProps> = ({
  onSuccess,
  title,
  disclosure,
  item,
}) => {
  const { onClose, isOpen, onOpenChange, onOpen } = disclosure;
  const [params, setParams] = useImmer<{
    name?: string;
    description?: string | null;
  }>({
    name: item?.name,
    description: item?.description,
  });
  const [isPublic, setIsPublic] = useState(true);
  const mutation = api.favorites.update.useMutation({
    onSuccess: () => {
      onClose();
      onSuccess();
      toast.success('Update favorites successfully', {
        position: 'top-center',
      });
    },
  });

  const onCheck = () => {
    if (!params.name || params.name.length > 30) {
      return false;
    }
    return true;
  };

  useEffect(() => {
    if (item) {
      setParams((draft) => {
        draft.name = item.name ?? '';
        draft.description = item.description ?? '';
      });
    }
  }, [item, setParams]);

  const createFavorites = api.favorites.create.useMutation({
    onSuccess: () => {
      onClose();
      onSuccess();
      toast.success('Create favorites successfully', {
        position: 'top-center',
      });
    },
    onError: (err) => {
      toast.error(err.message, { position: 'top-center' });
    },
  });

  const onUpdateFavorites = async () => {
    if (!onCheck()) {
      return;
    }
    await mutation.mutateAsync({
      id: item?.id ?? 0,
      name: params.name!,
      description: params.description!,
    });
  };

  const onCreate = async () => {
    if (!onCheck()) {
      return;
    }
    await createFavorites.mutateAsync({
      name: params.name!,
      description: params.description!,
    });
  };

  const onValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name as keyof typeof params;
    setParams((draft) => {
      draft[name] = e.target.value;
    });
  };

  const handleClose = () => {
    setParams((draft) => {
      draft.name = '';
      draft.description = '';
    });
  };

  const handleOk = () => {
    if (item) {
      void onUpdateFavorites();
    } else {
      void onCreate();
    }
  };

  return (
    <div className='mr-auto'>
      {isValidElement(title) ? (
        <div onClick={onOpen}>{title}</div>
      ) : (
        <Button color='default' variant='flat' onPress={onOpen}>
          {title ?? 'Create'}
        </Button>
      )}
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        onClose={handleClose}
        placement='top-center'
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className='flex flex-col gap-1'>
                {item ? 'Edit Favorites' : 'Add Favorites'}
              </ModalHeader>
              <ModalBody>
                <Input
                  autoFocus
                  name='name'
                  value={params.name}
                  isInvalid={!!params.name && params.name?.length > 30}
                  errorMessage={
                    params?.name &&
                    params.name.length > 30 &&
                    'Name up to 30 characters'
                  }
                  onChange={onValueChange}
                  isRequired
                  label='Name'
                  placeholder='Enter your favorites name'
                  variant='bordered'
                />
                <Textarea
                  max={100}
                  maxLength={100}
                  variant='bordered'
                  name='description'
                  onChange={onValueChange}
                  placeholder='Please enter a description.'
                  value={params?.description ?? ''}
                />
                <div className='flex justify-between px-1 py-2'>
                  <Checkbox
                    isSelected={isPublic}
                    onValueChange={setIsPublic}
                    classNames={{
                      label: 'text-small',
                    }}
                  >
                    Public
                  </Checkbox>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color='danger' variant='flat' onPress={onClose}>
                  Cancel
                </Button>
                <Button color='primary' onClick={handleOk}>
                  {item ? 'Update' : 'Create'}
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default memo(FavoritesModal);
