import { z } from 'zod';

export const createFavoritesSchema = z.object({
  name: z.string(),
  description: z.string().optional(),
});

export type CreateCollectionSchemaInput = z.infer<typeof createFavoritesSchema>;

export const updateFavoritesSchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string().optional(),
});
