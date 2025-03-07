import { ZodError } from 'zod';

import { type CreateTourAttributes } from '../../models/tours/tour-schemas-and-types';
import { toursModel } from '../../models/tours/toursModel';
import { type ExpressHandlerWithBody } from '../../types/express-types';
import { createTourJSend } from '../../views/tours/createTourJSend';
import { handleError } from '../_utils/handleError';
import { handleZodError } from '../_utils/handleZodError';

export const handleCreateTour: ExpressHandlerWithBody<CreateTourAttributes> = (
  req,
  res,
) => {
  const asyncHandler = async () => {
    try {
      const createTourFields = req.body;
      const insertedTour = await toursModel.insertOne(createTourFields);
      const json = createTourJSend(insertedTour);
      res.status(201).json(json);
    } catch (err: unknown) {
      if (err instanceof ZodError) {
        handleZodError({ res, err });
        return;
      }

      handleError({ res, err });
    }
  };

  void asyncHandler();
};
