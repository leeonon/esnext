import { QueryProjectListSchema } from "~/schema/project.schema";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const projectRouter = createTRPCRouter({
  all: publicProcedure.query(async ({ ctx }) => {
    const all = await ctx.db.project.findMany();
    return all;
  }),

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

  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.db.example.findMany();
  }),

  getSecretMessage: protectedProcedure.query(() => {
    return "you can now see this secret message!";
  }),
});
