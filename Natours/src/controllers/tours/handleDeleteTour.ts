import { toursModel } from '../../models/tours/toursModel';
import { type ExpressHandlerWithIdParams } from '../../types/express-types';
import { JSendObject } from '../../views/_types/JSend';
import { handleError } from '../_utils/handleError';

export const handleDeleteTour: ExpressHandlerWithIdParams = (req, res) => {
  const asyncHandler = async () => {
    try {
      const { id } = req.params;
      await toursModel.deleteTour(id);
      const json: JSendObject = {
        status: 'success',
        data: {},
      };
      res.status(204).json(json);
    } catch (err: unknown) {
      handleError({ err, res });
    }
  };

  void asyncHandler();
};
