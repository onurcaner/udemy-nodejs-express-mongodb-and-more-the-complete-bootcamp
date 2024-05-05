import { ExpressHandler } from './ExpressHandler';
import { readTours } from './readTours';

export const handleTours: ExpressHandler = (_request, response) => {
  readTours()
    .then((tours) => {
      response.status(200).json({
        status: 'success',
        data: { tours, count: tours.length },
      });
    })
    .catch(() => {
      response.status(500).json({
        status: 'error',
        message: 'Can not retrieve tours from server',
      });
    });
};
