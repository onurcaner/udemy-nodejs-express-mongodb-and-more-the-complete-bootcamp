import { ZodError } from 'zod-validation-error';

export function createFailDataFromZodError(
  err: ZodError,
): Record<string, string> {
  const { issues } = err;
  const entries = issues.map((issue): [string, string] => [
    issue.path.join(''),
    issue.message,
  ]);
  const failData = Object.fromEntries(entries);
  return failData;
}
