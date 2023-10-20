import { z } from "zod";

export const createFavoritesSchema = z.object({
  name: z.string(),
});

export type CreateCollectionSchemaInput = z.infer<typeof createFavoritesSchema>;
