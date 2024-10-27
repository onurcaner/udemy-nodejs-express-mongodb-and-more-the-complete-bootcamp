import { ZodError } from 'zod';
import { fromZodError } from 'zod-validation-error';

export function createMessageFromError(err: unknown): string {
  if (err instanceof ZodError) {
    const message = fromZodError(err).toString();
    return message;
  }

  if (err instanceof Error) {
    const { message } = err;
    return message;
  }

  return 'Something went wrong';
}
