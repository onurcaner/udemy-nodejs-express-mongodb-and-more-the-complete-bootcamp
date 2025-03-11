import { type Sort } from 'mongodb';
import { z } from 'zod';

import { type SortByQueryObject } from '../_constants/SortByQueryObject';
import { parseSortBy } from '../_utils/parseSortBy';

const mongoFilterNumber = z.number().int().gte(-1).lte(1);
const toursSortSchema = z.object({
  price: mongoFilterNumber.optional(),
  ratings_average: mongoFilterNumber.optional(),
});

export function createToursSort(queryObject: SortByQueryObject): Sort | null {
  const { sort_by } = queryObject;
  if (!sort_by) return null;

  const sortObject = parseSortBy(sort_by);
  if (!sortObject) return null;

  const parsedSortObject = toursSortSchema.parse(
    sortObject,
  ) as typeof sortObject;
  return parsedSortObject;
}
