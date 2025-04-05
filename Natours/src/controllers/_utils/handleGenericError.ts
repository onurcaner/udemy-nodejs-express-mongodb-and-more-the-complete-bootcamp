import { type Response } from 'express';

import { createGenericJSendError } from '../../views/_utils/createGenericJSendError';
import { createGenericJSendFail } from '../../views/_utils/createGenericJSendFail';
import { createMessageFromError } from '../../views/_utils/createMessageFromError';
import { createStatusCodeFromError } from './createStatusCodeFromError';

export function handleGenericError({
  err,
  res,
  status,
}: {
  res: Response;
  err: unknown;
  status?: number;
}): void {
  const statusCode = status ?? createStatusCodeFromError(err);
  const message = createMessageFromError(err);
  const json =
    statusCode >= 500
      ? createGenericJSendError(message)
      : createGenericJSendFail({}, message);
  res.status(statusCode).json(json);
}
