import { createTRPCRouter, protectedProcedure } from '~/api/trpc';
import { queryUserFavoritesPageInputSchema } from '~/schema/user.schema';

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
  userFavoritesPage: protectedProcedure
    .input(queryUserFavoritesPageInputSchema)
    .query(async ({ ctx, input }) => {
      const { page, pageSize } = input;
      const where = {
        userId: ctx.session.user.id,
      };
      const favorites = await ctx.db.favorites.findMany({
        where,
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
        skip: (page - 1) * pageSize,
        take: pageSize,
      });

      const total = await ctx.db.favorites.count();
      const hasMore = total > page * pageSize;
      const totalPage = Math.ceil(total / pageSize);

      const transformedFavorites = favorites.map((favorite) => ({
        ...favorite,
        projects: favorite.projects.map(
          (projectInFavorite) => projectInFavorite.project,
        ),
      }));
      return {
        list: transformedFavorites,
        total,
        totalPage,
        hasMore,
      };
    }),
});
