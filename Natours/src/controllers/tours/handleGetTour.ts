import { readTours } from '../../models/tours/readTours';
import { ExpressHandlerWithIdParams } from '../../types/express-types';

export const handleGetTour: ExpressHandlerWithIdParams = (req, res) => {
  const { id } = req.params;

  readTours()
    .then((tours) => {
      const tour = tours.find((tour) => tour._id === id);
      if (!tour) {
        const message = `Tour with id=${id} is not existing`;
        throw new Error(message);
      }
      return tour;
    })
    .then((tour) => {
      res.status(200).json({
        status: 'success',
        data: { tour },
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
