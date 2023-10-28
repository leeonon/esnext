import { createFavoritesSchema } from '~/schema/collection.schema';
import { createTRPCRouter, protectedProcedure } from '~/server/api/trpc';

export const favoritesRouter = createTRPCRouter({
  create: protectedProcedure
    .input(createFavoritesSchema)
    .mutation(async ({ ctx, input }) => {
      return ctx.db.favorites.create({
        data: {
          name: input.name,
          userId: ctx.session.user.id,
          ...(input.description ? { description: input.description } : {}),
        },
      });
    }),
});
