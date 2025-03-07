import { createToursFilter } from '../../models/tours/createToursFilter';
import { toursModel } from '../../models/tours/toursModel';
import { type ExpressHandler } from '../../types/express-types';
import { createToursJSend } from '../../views/tours/createToursJSend';
import { handleError } from '../_utils/handleError';

export const handleGetTours: ExpressHandler = (req, res) => {
  const asyncHandler = async () => {
    try {
      const { query } = req;
      const filter = createToursFilter(query);
      const tours = await toursModel.findAll(filter);
      const json = createToursJSend(tours);
      res.status(200).json(json);
    } catch (err: unknown) {
      handleError({ err, res });
    }
  };

  void asyncHandler();
};
