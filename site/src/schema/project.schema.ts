// https://github.com/leojuriolli7/t3-blog/blob/main/src/schema/user.schema.ts
import { z } from "zod";

export const QueryProjectListSchema = z.object({
  limit: z.number().default(20),
  cursor: z.number().optional(),
  category: z.string().optional(),
  tags: z.string().optional(),
});
