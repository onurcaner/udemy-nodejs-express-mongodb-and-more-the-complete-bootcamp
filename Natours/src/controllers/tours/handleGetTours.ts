import { toursModel } from '../../models/tours/toursModel';
import { ExpressHandler } from '../../types/express-types';
import { createMessageFromError } from '../utils/createMessageFromError';

export const handleGetTours: ExpressHandler = (_req, res) => {
  toursModel
    .getAll()
    .then((tours) => {
      res.status(200).json({
        status: 'success',
        data: {
          tours,
        },
      });
    })
    .catch((err: unknown) => {
      res.status(500).json({
        status: 'error',
        message: createMessageFromError(err),
      });
    });
};
