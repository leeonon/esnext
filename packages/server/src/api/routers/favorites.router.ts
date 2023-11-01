import { TRPCError } from '@trpc/server';
import { z } from 'zod';

import { createTRPCRouter, protectedProcedure } from '~/api/trpc';
import {
  createFavoritesSchema,
  updateFavoritesSchema,
} from '~/schema/collection.schema';

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
  remove: protectedProcedure
    .input(z.number())
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session.user.id;
      const result = await ctx.db.favorites.delete({
        where: {
          id: input,
          userId,
        },
      });
      if (!result) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Favorites not found',
        });
      }
    }),
  detail: protectedProcedure.input(z.string()).query(async ({ ctx, input }) => {
    const userId = ctx.session.user.id;
    const favorites = await ctx.db.favorites.findFirst({
      where: {
        name: input,
        userId,
      },
      select: {
        name: true,
        description: true,
        id: true,
        projects: {
          select: {
            project: true,
          },
        },
      },
    });
    if (!favorites) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: 'Favorites not found',
      });
    }
    return {
      ...favorites,
      projects: favorites.projects.map(
        (projectInFavorite) => projectInFavorite.project,
      ),
    };
  }),
});
