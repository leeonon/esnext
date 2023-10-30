import FavoritesList from "../components/FavoritesList";
import UserLayoutTitle from "../components/Title";

export default function Page() {
  return (
    <>
      <UserLayoutTitle title="My Favorites"></UserLayoutTitle>
      <FavoritesList />
    </>
  );
}
