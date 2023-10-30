'use client';

import type { UserFavoritesItemType } from '~/types/api';

import { Pagination, useDisclosure } from '@nextui-org/react';
import { api } from '~/trpc/react';
import { useCallback, useState } from 'react';
import tw from 'twin.macro';

import FavoritesModal from '~/components/FavoritesModal';

import UserLayoutTitle from '../components/Title';
import FavoritesItem from './components/Item';
import SkeletonItem from './components/Skeleton';

const Container = tw.div`
  grid grid-flow-row grid-cols-5 gap-4 py-4
  max-2xl:grid-cols-4 max-xl:grid-cols-3 max-lg:grid-cols-2
  max-md:grid-cols-1
`;

const FavoritesList = ({
  list,
  onEdit,
}: {
  list: UserFavoritesItemType[];
  onEdit: (item: UserFavoritesItemType) => void;
}) => {
  return (
    <>
      {list.map((_, index) => (
        <FavoritesItem key={index} item={_} onEdit={onEdit} />
      ))}
    </>
  );
};

export default function Client() {
  const [page, setPage] = useState(1);
  const [currentItem, setCurrentItem] = useState<UserFavoritesItemType>();

  const { onClose, isOpen, onOpenChange, onOpen, ...rest } = useDisclosure();

  const {
    data: { list = [], hasMore, total, totalPage } = {},
    isLoading,
    refetch,
  } = api.user.userFavoritesPage.useQuery(
    {
      page,
      pageSize: 20,
    },
    {
      refetchOnWindowFocus: false,
    },
  );

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

  if (isLoading) {
    return (
      <Container>
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
      </Container>
    );
  }
  return (
    <>
      <UserLayoutTitle title='My Favorites'>
        <div>
          <FavoritesModal
            item={currentItem}
            disclosure={{ isOpen, onClose, onOpenChange, onOpen, ...rest }}
            onSuccess={onSuccess}
            title='New Favorites'
          />
        </div>
      </UserLayoutTitle>
      <Container>
        {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
        <FavoritesList list={list} onEdit={onEdit} />
      </Container>
      <div className='mt-11 flex justify-center'>
        <Pagination
          total={totalPage ?? 0}
          color='secondary'
          page={page}
          onChange={setPage}
        />
      </div>
    </>
  );
}
