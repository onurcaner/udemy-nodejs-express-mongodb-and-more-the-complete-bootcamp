import { type TourAttributes } from '../../models/tours/tour-schemas-and-types';
import { type JSendObject } from '../_types/JSend';

export function createTourJSend(tour: TourAttributes): JSendObject {
  return {
    status: 'success',
    data: {
      tour,
    },
  };
}
