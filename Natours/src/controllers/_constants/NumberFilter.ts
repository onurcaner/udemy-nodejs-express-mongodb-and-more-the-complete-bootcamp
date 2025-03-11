import { z } from 'zod';

const stringNumberSchema = z.string().min(1).max(12);

const gteSchema = z.union([
  z.object({ gt: stringNumberSchema, gte: z.undefined() }),
  z.object({ gte: stringNumberSchema, gt: z.undefined() }),
]);
const lteSchema = z.union([
  z.object({ lt: stringNumberSchema, lte: z.undefined() }),
  z.object({ lte: stringNumberSchema, lt: z.undefined() }),
]);

export const numberFilterSchema = z.union([
  stringNumberSchema,
  gteSchema,
  lteSchema,
  z.intersection(gteSchema, lteSchema),
]);
export type NumberFilter = z.infer<typeof numberFilterSchema>;
