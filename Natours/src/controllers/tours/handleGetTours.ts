import { ExpressHandler } from '../../global-types';
import { readTours } from '../../models/tours/readTours';

export const handleGetTours: ExpressHandler = (_req, res) => {
  readTours()
    .then((tours) => {
      res.status(200).json({
        status: 'success',
        data: { tours, count: tours.length },
      });
    })
    .catch(() => {
      res.status(500).json({
        status: 'error',
        message: 'Can not retrieve tours from server',
      });
    });
};
