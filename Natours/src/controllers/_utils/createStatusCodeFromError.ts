import { ZodError } from 'zod';

import {
  AlreadyExistingError,
  InvalidIdError,
  NotFoundError,
} from '../../models/_constants/Errors';

export function createStatusCodeFromError(err: unknown): number {
  if (err instanceof ZodError) return 400;
  if (err instanceof AlreadyExistingError) return 400;
  if (err instanceof InvalidIdError) return 400;
  if (err instanceof NotFoundError) return 404;
  return 500;
}
