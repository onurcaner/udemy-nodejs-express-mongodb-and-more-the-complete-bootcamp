import { type Response } from 'express';

import { createGenericJSendError } from '../../views/_utils/createGenericJSendError';
import { createMessageFromError } from '../../views/_utils/createMessageFromError';

export function handleError({
  err,
  res,
  status = 500,
}: {
  res: Response;
  err: unknown;
  status?: number;
}): void {
  const message = createMessageFromError(err);
  const json = createGenericJSendError(message);
  res.status(status).json(json);
}
