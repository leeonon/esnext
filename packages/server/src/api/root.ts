import { exampleRouter } from './routers/example';
import { favoritesRouter } from './routers/favorites.router';
import { projectRouter } from './routers/project.router';
import { userRouter } from './routers/user.router';
import { createTRPCRouter } from './trpc';

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
