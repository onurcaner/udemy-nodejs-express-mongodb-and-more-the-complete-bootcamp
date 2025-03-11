import { type ExpressHandler } from '../types/express-types';
import { createGenericJSendError } from '../views/_utils/createGenericJSendError';

export const checkId: ExpressHandler = (req, res, next) => {
  const { id } = req.params;

  if (!id) {
    const message = 'id param is not OK, is empty';
    const json = createGenericJSendError(message);
    res.status(500).json(json);
    return;
  }

  next();
};
