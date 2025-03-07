import { env } from 'node:process';
import { z } from 'zod';

const typedEnvSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']),
  PORT: z.number(),
  MONGODB_ATLAS_URL: z.string().min(1),
  MONGODB_ATLAS_PASSWORD: z.string().min(1),
});

export const typedEnv = typedEnvSchema.parse({
  NODE_ENV: env.NODE_ENV?.trim(),
  PORT: Number.parseInt(env.PORT ?? ''),
  MONGODB_ATLAS_URL: env.MONGODB_ATLAS_URL,
  MONGODB_ATLAS_PASSWORD: env.MONGODB_ATLAS_PASSWORD,
});
