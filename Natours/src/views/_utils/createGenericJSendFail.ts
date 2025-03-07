import { JSendObject } from '../_types/JSend';

export function createGenericJSendFail(
  data: object,
  message?: string,
): JSendObject {
  return {
    status: 'fail',
    data,
    ...(message && { message }),
  };
}
