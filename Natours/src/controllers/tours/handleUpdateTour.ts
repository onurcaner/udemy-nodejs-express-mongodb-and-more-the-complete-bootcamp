import { type UpdateTourAttributes } from '../../models/tours/tour-schemas-and-types';
import { toursModel } from '../../models/tours/toursModel';
import { type ExpressHandlerWithIdParamsAndBody } from '../../types/express-types';
import { createTourJSend } from '../../views/tours/createTourJSend';
import { handleError } from '../_utils/handleError';

export const handleUpdateTour: ExpressHandlerWithIdParamsAndBody<
  UpdateTourAttributes
> = (req, res) => {
  const asyncHandler = async () => {
    try {
      const { id } = req.params;
      const updateTourFields = req.body;
      const updatedTour = await toursModel.update(id, updateTourFields);
      const json = createTourJSend(updatedTour);
      res.status(200).send(json);
    } catch (err: unknown) {
      handleError({ err, res });
    }
  };

  void asyncHandler();
};
