import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const userRouter = createTRPCRouter({
  userInfo: protectedProcedure.query(async ({ ctx }) => {
    const user = await ctx.db.user.findUnique({
      where: {
        id: ctx.session.user.id,
      },
    });
    return user;
  }),
  userFavorites: protectedProcedure.query(async ({ ctx }) => {
    const favorites = await ctx.db.favorites.findMany({
      where: {
        userId: ctx.session.user.id,
      },
      select: {
        name: true,
        description: true,
        id: true,
        projects: {
          select: {
            project: {
              select: {
                id: true,
                name: true,
                fullName: true,
                logo: true,
              },
            },
          },
        },
      },
    });
    const transformedFavorites = favorites.map((favorite) => ({
      ...favorite,
      projects: favorite.projects.map(
        (projectInFavorite) => projectInFavorite.project,
      ),
    }));
    return transformedFavorites;
  }),
});
