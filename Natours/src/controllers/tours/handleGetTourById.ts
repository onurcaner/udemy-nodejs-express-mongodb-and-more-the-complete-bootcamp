import { toursModel } from '../../models/tours/toursModel';
import { ExpressHandlerWithIdParams } from '../../types/express-types';
import { createMessageFromError } from '../utils/createMessageFromError';

export const handleGetTourById: ExpressHandlerWithIdParams = (req, res) => {
  const { id } = req.params;

  toursModel
    .getById(id)
    .then((tour) => {
      res.status(200).json({
        status: 'success',
        data: {
          tour,
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
