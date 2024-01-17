'use client';

import type { UserFavoritesItemType } from '@esnext/server';

import { useCallback, useState } from 'react';
import { toast } from 'sonner';

import UserLayoutTitle from '~/app/user/components/Title';
import FavoritesModal from '~/components/FavoritesModal';
import { Button } from '~/components/ui/button';
import { Card } from '~/components/ui/card';
import { useDisclosure } from '~/hooks/useDisclosure';
import { api } from '~/trpc/react';

import { FavoritesList } from './components/List';
import SkeletonItem from './components/Skeleton';

const PAGE_SIZE = 20;

export default function Client() {
  const [page, setPage] = useState(1);
  const [currentItem, setCurrentItem] = useState<UserFavoritesItemType>();

  const { onOpen, ...rest } = useDisclosure({
    onClose() {
      setCurrentItem(undefined);
    },
  });

  const {
    data: { list = [], hasMore, total, totalPage } = {},
    isLoading,
    refetch,
  } = api.user.userFavoritesPage.useQuery(
    {
      page,
      pageSize: PAGE_SIZE,
    },
    {
      refetchOnWindowFocus: false,
    },
  );
  const removeMutation = api.favorites.remove.useMutation({
    onSuccess: () => {
      toast.success('Delete successfully', { position: 'top-center' });
      void refetch();
    },
    onError: (error) => {
      toast.error(error.message, { position: 'top-center' });
    },
  });

  const onSuccess = useCallback(() => {
    if (hasMore && !currentItem) {
      const lastPage = Math.ceil(total ? total / 20 : 1);
      setPage(lastPage);
    } else {
      void refetch();
    }
  }, [currentItem, hasMore, refetch, total]);

  const onEdit = useCallback(
    (item: UserFavoritesItemType) => {
      setCurrentItem(item);
      onOpen();
    },
    [onOpen],
  );

  const onRemove = useCallback(
    (item: UserFavoritesItemType) => {
      // TODO confirm -> alert dialog
      removeMutation.mutateAsync(item.id);
    },
    [removeMutation],
  );

  const onNextPage = () => {
    if (hasMore) {
      setPage((page) => page + 1);
    }
  };

  const onLastPage = () => {
    if (page === 1) return;
    setPage((page) => page - 1);
  };

  if (isLoading) {
    return (
      <div
        className='grid grid-flow-row grid-cols-5 gap-4 py-4
      max-2xl:grid-cols-4 max-xl:grid-cols-3 max-lg:grid-cols-2
      max-md:grid-cols-1'
      >
        <SkeletonItem />
        <SkeletonItem />
        <SkeletonItem />
        <SkeletonItem />
        <SkeletonItem />
        <SkeletonItem />
        <SkeletonItem />
        <SkeletonItem />
        <SkeletonItem />
        <SkeletonItem />
      </div>
    );
  }
  return (
    <>
      <UserLayoutTitle title='Favorites'>
        <div>
          <FavoritesModal
            item={currentItem}
            disclosure={{ onOpen, ...rest }}
            onSuccess={onSuccess}
            title='New Favorites'
          />
        </div>
      </UserLayoutTitle>
      <div className='min-h-[calc(100vh-250px)]'>
        <div
          className='grid grid-flow-row grid-cols-5 gap-4 py-4
  max-2xl:grid-cols-4 max-xl:grid-cols-3 max-lg:grid-cols-2
  max-md:grid-cols-1'
        >
          <FavoritesList list={list} onEdit={onEdit} onRemove={onRemove} />
        </div>
      </div>
      {(total ?? 0) > PAGE_SIZE && (
        <Card className='ml-auto mt-8 inline-flex items-center gap-4 p-4'>
          <Button onClick={onLastPage} disabled={page === 1}>
            Last Page
          </Button>
          <div>
            {page}/{totalPage}
          </div>
          <Button onClick={onNextPage} disabled={!hasMore}>
            Next Page
          </Button>
        </Card>
      )}
    </>
  );
}
