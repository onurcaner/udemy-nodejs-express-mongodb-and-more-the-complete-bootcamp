import { toursModel } from '../../models/tours/toursModel';
import { type ExpressHandlerWithIdParams } from '../../types/express-types';
import { JSendObject } from '../../views/_types/JSend';
import { handleGenericError } from '../_utils/handleGenericError';

export const handleDeleteTour: ExpressHandlerWithIdParams = async (
  req,
  res,
) => {
  try {
    const { id } = req.params;
    await toursModel.delete(id);
    const json: JSendObject = {
      status: 'success',
      data: {},
    };
    res.status(204).json(json);
  } catch (err: unknown) {
    handleGenericError({ err, res });
  }
};
