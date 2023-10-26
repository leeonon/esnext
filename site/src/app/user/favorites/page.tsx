import FavoritesList from "../components/favoritesList";
import UserLayoutTitle from "../components/title";

export default function Page() {
  return (
    <>
      <UserLayoutTitle title="My Favorites"></UserLayoutTitle>
      <FavoritesList />
    </>
  );
}
