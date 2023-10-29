'use client';

import { Pagination } from '@nextui-org/react';
import { api } from '~/trpc/react';
import { useCallback, useState } from 'react';
import tw from 'twin.macro';

import FavoritesModal from '~/components/FavoritesModal';

import UserLayoutTitle from '../components/title';
import FavoritesItem from './components/item';
import SkeletonItem from './components/skeleton';

const Container = tw.div`
  grid grid-flow-row grid-cols-5 gap-4 py-4
  max-2xl:grid-cols-4 max-xl:grid-cols-3 max-lg:grid-cols-2
  max-md:grid-cols-1
`;

export default function Client() {
  const [page, setPage] = useState(1);

  const {
    data: { list = [], hasMore, total, totalPage } = {},
    isFetching,
    isPreviousData,
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

  const onNextPage = useCallback(() => {
    if (hasMore) {
      const lastPage = Math.ceil(total ? total / 20 : 1);
      setPage(lastPage);
    } else {
      void refetch();
    }
  }, [hasMore, refetch, total]);

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
          <FavoritesModal onSuccess={onNextPage} title='New Favorites' />
        </div>
      </UserLayoutTitle>
      <Container>
        {list.map((_, index) => (
          <FavoritesItem key={index} item={_} />
        ))}
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
