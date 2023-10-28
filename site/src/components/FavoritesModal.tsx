'use client';

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
  useDisclosure,
} from '@nextui-org/react';
import { api } from '~/trpc/react';
import { memo, useState } from 'react';
import { toast } from 'sonner';

const FavoritesModal: FC<{
  onSuccess: () => void;
}> = ({ onSuccess }) => {
  const { onClose, isOpen, onOpenChange, onOpen } = useDisclosure();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [isPublic, setIsPublic] = useState(true);

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
  const onCreate = async () => {
    if (!name || name.length > 30) {
      return;
    }
    await createFavorites.mutateAsync({
      name,
      description,
    });
  };

  return (
    <div className='mr-auto'>
      <Button color='default' variant='flat' onPress={onOpen}>
        Create
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement='top-center'>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className='flex flex-col gap-1'>
                Collections
              </ModalHeader>
              <ModalBody>
                <Input
                  autoFocus
                  value={name}
                  isInvalid={name.length > 30}
                  errorMessage={name.length > 30 && 'Name up to 30 characters'}
                  onValueChange={setName}
                  isRequired
                  label='Name'
                  placeholder='Enter your favorites name'
                  variant='bordered'
                />
                <Textarea
                  max={100}
                  maxLength={100}
                  variant='bordered'
                  onValueChange={setDescription}
                  placeholder='Please enter a description.'
                  value={description}
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
                <Button color='primary' onClick={() => void onCreate()}>
                  Create
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
