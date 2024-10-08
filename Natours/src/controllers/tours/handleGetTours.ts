import { readTours } from '../../models/tours/readTours';
import { ExpressHandler } from '../../types/express-types';

export const handleGetTours: ExpressHandler = (_req, res) => {
  readTours()
    .then((tours) => {
      res.status(200).json({
        status: 'success',
        data: { tours, count: tours.length },
      });
    })
    .catch((err: unknown) => {
      const error = err as Error;
      res.status(500).json({
        status: 'error',
        message: error.message,
      });
    });
};
