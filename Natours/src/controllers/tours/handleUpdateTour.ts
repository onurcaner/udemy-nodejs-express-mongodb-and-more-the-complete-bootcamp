import { type UpdateTourAttributes } from '../../models/tours/tour-schemas-and-types';
import { toursModel } from '../../models/tours/toursModel';
import { type ExpressHandlerWithIdParamsAndBody } from '../../types/express-types';
import { createTourJSend } from '../../views/tours/createTourJSend';
import { handleGenericError } from '../_utils/handleGenericError';

export const handleUpdateTour: ExpressHandlerWithIdParamsAndBody<
  UpdateTourAttributes
> = async (req, res) => {
  try {
    const { id } = req.params;
    const updateTourFields = req.body;
    const updatedTour = await toursModel.update(id, updateTourFields);
    const json = createTourJSend(updatedTour);
    res.status(200).send(json);
  } catch (err: unknown) {
    handleGenericError({ err, res });
  }
};
