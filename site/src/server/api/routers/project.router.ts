import { z } from "zod";

import { QueryProjectListSchema } from "~/schema/project.schema";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

/**
 * TRPC router for project-related API endpoints.
 */
export const projectRouter = createTRPCRouter({
  /**
   * Public procedure to retrieve all projects.
   * @returns {Promise<Project[]>} A promise that resolves to an array of all projects.
   */
  all: publicProcedure.query(async ({ ctx }) => {
    const all = await ctx.db.project.findMany();
    return all;
  }),

  /**
   * Public procedure to query a list of projects.
   * @param {QueryProjectListSchema} input - The input object containing query parameters.
   * @returns {Promise<ProjectList>} A promise that resolves to an object containing the list of projects and a cursor for pagination.
   */
  query: publicProcedure
    .input(QueryProjectListSchema)
    .query(async ({ ctx, input }) => {
      const { limit, cursor } = input;
      const list = await ctx.db.project.findMany({
        take: limit + 1,
        cursor: cursor ? { id: cursor } : undefined,
      });

      let nextCursor: typeof cursor | undefined = undefined;
      if (list.length > limit) {
        const nextItem = list.pop();
        nextCursor = nextItem!.id;
      }

      return {
        list,
        nextCursor,
      };
    }),

  /**
   * Protected procedure to query project detail.
   * @param {string} input - The project name.
   * @returns {Promise<Project>} A promise that resolves to the project object.
   */
  detail: publicProcedure.input(z.string()).query(async ({ ctx, input }) => {
    const project = await ctx.db.project.findFirstOrThrow({
      where: {
        name: input,
      },
    });
    return project;
  }),
});
