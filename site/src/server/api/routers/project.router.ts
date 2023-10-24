import { z } from "zod";

import {
  CollectionProjectSchema,
  QueryProjectListSchema,
} from "~/schema/project.schema";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

/**
 * TRPC router for project-related API endpoints.
 */
export const projectRouter = createTRPCRouter({
  popular: publicProcedure.query(async ({ ctx }) => {
    const result = await ctx.db.project.findMany({
      orderBy: {
        stars: "desc",
      },
      take: 10,
    });
    return result;
  }),
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
    const projectData = await ctx.db.project.findFirst({
      where: {
        name: input,
      },
      include: {
        readme: true,
        tags: {
          include: {
            tag: {
              select: {
                name: true,
              },
            },
          },
        },
        ...(ctx.session?.user && {
          projectInFavorites: {
            where: {
              favorites: {
                userId: ctx.session!.user.id,
              },
            },
            select: {
              favoritesId: true,
            },
          },
        }),
      },
    });

    let project;

    if (projectData) {
      // 检查项目是否已经在用户的收藏夹中
      const isCollection = projectData.projectInFavorites?.length > 0;
      project = {
        ...projectData,
        tags: projectData.tags
          ? projectData.tags.map((tagRelation) => tagRelation.tag.name)
          : undefined,
        isCollection,
      };
      return project;
    } else {
      throw new Error("Project not found");
    }
  }),
  collection: protectedProcedure
    .input(CollectionProjectSchema)
    .mutation(async ({ ctx, input }) => {
      const favorites = await ctx.db.favorites.findMany({
        where: {
          userId: ctx.session.user.id,
          id: { in: input.favoriteIds },
        },
      });

      if (favorites.length !== input.favoriteIds.length) {
        throw new Error("Invalid favorites");
      }

      const projectId = input.projectId;
      const submittedFavorites = input.favoriteIds.map((id) => ({
        favoritesId: id,
        projectId,
      }));

      await ctx.db.$transaction(async () => {
        // 删除所有不在提交列表中的记录
        await ctx.db.projectInFavorites.deleteMany({
          where: {
            projectId,
            favoritesId: {
              notIn: submittedFavorites.map((f) => f.favoritesId),
            },
          },
        });
      });

      // 更新现有记录或插入新记录
      await Promise.all(
        submittedFavorites.map(async (f) => {
          await ctx.db.projectInFavorites.upsert({
            where: {
              projectId_favoritesId: {
                projectId: f.projectId,
                favoritesId: f.favoritesId,
              },
            },
            update: {},
            create: f,
          });
        }),
      );
    }),
});
