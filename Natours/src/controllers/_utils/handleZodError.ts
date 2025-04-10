import { type Response } from 'express';
import { type ZodError } from 'zod-validation-error';

import { createFailDataFromZodError } from '../../views/_utils/createFailDataFromZodError';
import { createGenericJSendFail } from '../../views/_utils/createGenericJSendFail';
import { createMessageFromError } from '../../views/_utils/createMessageFromError';
import { createStatusCodeFromError } from './createStatusCodeFromError';

export function handleZodError({
  err,
  res,
  status,
}: {
  res: Response;
  err: ZodError;
  status?: number;
}): void {
  const statusCode = status ?? createStatusCodeFromError(err);
  const data = createFailDataFromZodError(err);
  const message = createMessageFromError(err);
  const json = createGenericJSendFail(data, message);
  res.status(statusCode).json(json);
}
