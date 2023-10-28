import { api } from '~/trpc/server';

import FavoritesList from '../components/favoritesList';
import UserLayoutTitle from '../components/title';

export default function Page() {
  const queryFavorites = api.user.userFavoritesPage.query(
    {
      page: 1,
      pageSize: 10,
    },
    {
      refetchOnWindowFocus: false,
    },
  );
  return (
    <>
      <UserLayoutTitle title='My Favorites'></UserLayoutTitle>
      <FavoritesList />
    </>
  );
}
