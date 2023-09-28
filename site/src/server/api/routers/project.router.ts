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

  // query: publicProcedure.query(async ({ ctx, input }) => { }),

  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.db.example.findMany();
  }),

  getSecretMessage: protectedProcedure.query(() => {
    return "you can now see this secret message!";
  }),
});
