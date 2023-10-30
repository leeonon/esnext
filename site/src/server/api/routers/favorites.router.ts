import { TRPCError } from '@trpc/server';

import {
  createFavoritesSchema,
  updateFavoritesSchema,
} from '~/schema/collection.schema';
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
  update: protectedProcedure
    .input(updateFavoritesSchema)
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session.user.id;

      const favorites = await ctx.db.favorites.findFirst({
        where: {
          id: input.id,
          userId,
        },
      });

      if (!favorites || favorites.userId !== userId) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Favorites not found',
        });
      }

      return ctx.db.favorites.update({
        where: {
          id: input.id,
        },
        data: {
          name: input.name,
          ...(input.description ? { description: input.description } : {}),
        },
      });
    }),
});
