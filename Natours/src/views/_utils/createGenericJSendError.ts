import { JSendObject } from '../_types/JSend';

export function createGenericJSendError(message: string): JSendObject {
  return {
    status: 'error',
    message,
  };
}
