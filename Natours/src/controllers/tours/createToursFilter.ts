import { type Filter } from 'mongodb';
import { z } from 'zod';

import { type TourAttributes } from '../../models/tours/tour-schemas-and-types';
import { numberFilterSchema } from '../_constants/NumberFilter';
import { transformNumberFilterIntoMongoFilterOperators } from '../_utils/transformNumberFilterIntoMongoFilterOperators';

const toursNumberFilterSchema = z.object({
  duration: numberFilterSchema.optional(),
  price: numberFilterSchema.optional(),
  rating: numberFilterSchema.optional(),
});

export function createToursFilter(
  queryObject: object,
): Filter<TourAttributes> | null {
  const { duration, price, rating } =
    toursNumberFilterSchema.parse(queryObject);
  if (!duration && !price && !rating) return null;

  const filter: Filter<TourAttributes> = {
    ...(duration && {
      duration: transformNumberFilterIntoMongoFilterOperators(duration),
    }),
    ...(price && {
      price: transformNumberFilterIntoMongoFilterOperators(price),
    }),
    ...(rating && {
      rating: transformNumberFilterIntoMongoFilterOperators(rating),
    }),
  };

  return filter;
}
