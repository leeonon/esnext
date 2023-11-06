/* eslint-disable jsx-a11y/click-events-have-key-events */
'use client';

import type { UserFavoritesItemType } from '@esnext/server';
import type { UseDisclosureReturn } from '~/hooks/useDisclosure';
import type { FC } from 'react';

import { isValidElement, memo } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

import { Button } from '~/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '~/components/ui/dialog';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '~/components/ui/form';
import { Input } from '~/components/ui/input';
import { Textarea } from '~/components/ui/textarea';
import { api } from '~/trpc/react';

const FormSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: 'Username must be at least 2 characters.',
    })
    .max(30, {
      message: 'Username must be at most 30 characters.',
    }),
  description: z.string().max(100, {
    message: 'Description must be at most 100 characters.',
  }),
});

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
  const { onClose, isOpen, onOpen, onToggle } = disclosure;
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: '',
      description: '',
    },
  });
  const mutation = api.favorites.update.useMutation({
    onSuccess: () => {
      onClose();
      onSuccess();
      toast.success('Update favorites successfully', {
        position: 'top-center',
      });
    },
  });

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

  const onUpdateFavorites = async (values: z.infer<typeof FormSchema>) => {
    await mutation.mutateAsync({
      id: item?.id ?? 0,
      ...values,
    });
  };

  const onCreate = async (values: z.infer<typeof FormSchema>) => {
    await createFavorites.mutateAsync(values);
  };

  const handleOk = async (values: z.infer<typeof FormSchema>) => {
    console.log(
      '🚀 ~ file: FavoritesModal.tsx:105 ~ handleOk ~ values:',
      values,
    );
    try {
      if (item) {
        await onUpdateFavorites(values);
      } else {
        await onCreate(values);
      }
    } catch (error) {}
  };

  return (
    <div className='mr-auto'>
      <Dialog open={isOpen} onOpenChange={onToggle}>
        <DialogTrigger asChild>
          {isValidElement(title) ? (
            <div onClick={onOpen}>{title}</div>
          ) : (
            <Button color='default' onClick={onOpen}>
              {title ?? 'Create'}
            </Button>
          )}
        </DialogTrigger>
        <DialogContent>
          <Form {...form}>
            <form
              onSubmit={void form.handleSubmit(handleOk)}
              className='w-2/3 space-y-6'
            >
              <DialogHeader className='flex flex-col gap-1'>
                <DialogTitle>
                  {item ? 'Edit Favorites' : 'Add Favorites'}
                </DialogTitle>
              </DialogHeader>

              <FormField
                control={form.control}
                name='name'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder='Enter your favorites name'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='description'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder='Please enter a description.'
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      This is your public display name.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter>
                <Button variant='destructive' onClick={onClose}>
                  Cancel
                </Button>
                <Button type='submit'>{item ? 'Update' : 'Create'}</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default memo(FavoritesModal);
