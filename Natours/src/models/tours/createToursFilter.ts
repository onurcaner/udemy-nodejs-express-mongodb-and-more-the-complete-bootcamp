import { type Filter } from 'mongodb';

import {
  type StringNumberFilter,
  stringNumberFilterSchema,
} from '../_constants/stringNumberFilterSchema';
import { parseStringNumberFilterField } from '../_utils/parseStringNumberFilterField';
import { type TourAttributes } from './tour-schemas-and-types';

interface ToursFilterOptions {
  duration?: StringNumberFilter;
  price?: StringNumberFilter;
  rating?: StringNumberFilter;
}

export function createToursFilter(
  options: ToursFilterOptions,
): Filter<TourAttributes> {
  let filter: Filter<TourAttributes> = {};
  const { duration, price, rating } = options;

  if (duration) {
    const parsedDuration = stringNumberFilterSchema.parse(duration);
    filter = {
      ...filter,
      duration: parseStringNumberFilterField(parsedDuration),
    };
  }

  if (price) {
    const parsedPrice = stringNumberFilterSchema.parse(price);
    filter = { ...filter, price: parseStringNumberFilterField(parsedPrice) };
  }

  if (rating) {
    const parsedRating = stringNumberFilterSchema.parse(rating);
    filter = { ...filter, rating: parseStringNumberFilterField(parsedRating) };
  }

  return filter;
}
