import type { AppRouter } from './root';
import type { inferRouterOutputs } from '@trpc/server';

type RouterOutput = inferRouterOutputs<AppRouter>;

export type ProjectItemType = RouterOutput['project']['all'][number];
export type ProjectDetailType = RouterOutput['project']['detail'];
export type UserFavoritesItemType =
  RouterOutput['user']['userFavorites'][number];
