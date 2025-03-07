import { type TourAttributes } from '../../models/tours/tour-schemas-and-types';
import { type JSendObject } from '../_types/JSend';

export function createToursJSend(tours: TourAttributes[]): JSendObject {
  return {
    status: 'success',
    data: {
      tours,
    },
  };
}
