import type { inferRouterOutputs } from "@trpc/server";
import type { AppRouter } from "~/server/api/root";

type RouterOutput = inferRouterOutputs<AppRouter>;

export type ProjectItemType = RouterOutput["project"]["all"][number];
export type ProjectDetailType = RouterOutput["project"]["detail"];
export type UserFavoritesItemType =
  RouterOutput["user"]["userFavorites"][number];
