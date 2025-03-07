import { type Response } from 'express';
import { type ZodError } from 'zod-validation-error';

import { createFailDataFromZodError } from '../../views/_utils/createFailDataFromZodError';
import { createGenericJSendFail } from '../../views/_utils/createGenericJSendFail';
import { createMessageFromError } from '../../views/_utils/createMessageFromError';

export function handleZodError({
  err,
  res,
  status = 400,
}: {
  res: Response;
  err: ZodError;
  status?: number;
}): void {
  const data = createFailDataFromZodError(err);
  const message = createMessageFromError(err);
  const json = createGenericJSendFail(data, message);
  res.status(status).json(json);
}
