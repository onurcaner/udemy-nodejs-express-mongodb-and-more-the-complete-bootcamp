import { toursModel } from '../../models/tours/toursModel';
import { type ExpressHandler } from '../../types/express-types';
import { createToursJSend } from '../../views/tours/createToursJSend';
import { handleError } from '../_utils/handleError';
import { createToursFilter } from './createToursFilter';
import { createToursSort } from './createToursSort';

export const handleGetTours: ExpressHandler = (req, res) => {
  const asyncHandler = async () => {
    try {
      const { query } = req;
      const filter = createToursFilter(query);
      const sort = createToursSort(query);
      const tours = await toursModel.findAll({ filter, sort });
      const json = createToursJSend(tours);
      res.status(200).json(json);
    } catch (err: unknown) {
      handleError({ err, res });
    }
  };

  void asyncHandler();
};
