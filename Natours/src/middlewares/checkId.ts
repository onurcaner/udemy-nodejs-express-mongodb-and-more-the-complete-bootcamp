import { type ExpressHandler } from '../types/express-types';

export const checkId: ExpressHandler = (req, res, next) => {
  const { id } = req.params;
  if (!id) {
    const message = 'id param is missing in URL';
    res.status(400).json({
      status: 'fail',
      message,
      data: {
        id: message,
      },
    });
    return;
  }

  next();
};
