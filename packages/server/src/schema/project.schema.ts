// https://github.com/leojuriolli7/t3-blog/blob/main/src/schema/user.schema.ts
import { z } from 'zod';

export const QueryProjectListSchema = z.object({
  limit: z.number().default(20),
  cursor: z.number().optional(),
  categorySlug: z.nullable(z.string()),
  keywords: z.string().optional(),
});

export const CollectionProjectSchema = z.object({
  projectId: z.number(),
  favoriteIds: z.array(z.number()).default([]),
});

export type CollectionProjectSType = z.infer<typeof CollectionProjectSchema>;
