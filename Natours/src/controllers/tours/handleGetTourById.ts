import { ZodError } from 'zod';

import { toursModel } from '../../models/tours/toursModel';
import { type ExpressHandlerWithIdParams } from '../../types/express-types';
import { createTourJSend } from '../../views/tours/createTourJSend';
import { handleError } from '../_utils/handleError';
import { handleZodError } from '../_utils/handleZodError';

export const handleGetTourById: ExpressHandlerWithIdParams = (req, res) => {
  const asyncHandler = async () => {
    try {
      const { id } = req.params;
      const tour = await toursModel.findById(id);
      const json = createTourJSend(tour);
      res.status(200).json(json);
    } catch (err: unknown) {
      if (err instanceof ZodError) {
        handleZodError({ err, res });
        return;
      }

      handleError({ err, res });
    }
  };

  void asyncHandler();
};
