import { z } from 'zod';

export const queryUserFavoritesPageInputSchema = z.object({
  page: z.number().default(1),
  pageSize: z.number().default(10),
});
