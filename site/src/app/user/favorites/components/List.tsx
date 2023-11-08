import type { UserFavoritesItemType } from '@esnext/server';

import FavoritesItem from './Item';

export const FavoritesList = ({
  list,
  onEdit,
  onRemove,
}: {
  list: UserFavoritesItemType[];
  onEdit: (item: UserFavoritesItemType) => void;
  onRemove: (item: UserFavoritesItemType) => void;
}) => {
  return list.map((_, index) => (
    <FavoritesItem key={index} item={_} onEdit={onEdit} onRemove={onRemove} />
  ));
};
