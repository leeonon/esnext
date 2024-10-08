import type { AppRouter } from '@esnext/server/src/api/root';
import type { inferRouterOutputs } from '@trpc/server';

type RouterOutput = inferRouterOutputs<AppRouter>;

export type ProjectItemType = RouterOutput['project']['all'][number];
export type ProjectDetailType = RouterOutput['project']['detail'];
export type UserFavoritesItemType =
  RouterOutput['user']['userFavorites'][number];
