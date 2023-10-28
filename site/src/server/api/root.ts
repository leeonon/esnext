import { exampleRouter } from '~/server/api/routers/example';
import { favoritesRouter } from '~/server/api/routers/favorites.router';
import { projectRouter } from '~/server/api/routers/project.router';
import { userRouter } from '~/server/api/routers/user.router';
import { createTRPCRouter } from '~/server/api/trpc';

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  example: exampleRouter,
  project: projectRouter,
  user: userRouter,
  favorites: favoritesRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
