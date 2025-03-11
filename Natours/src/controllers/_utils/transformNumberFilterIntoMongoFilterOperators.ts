import { type FilterOperators } from 'mongodb';

import { type NumberFilter } from '../_constants/NumberFilter';

export function transformNumberFilterIntoMongoFilterOperators(
  numberFilter: NumberFilter,
): FilterOperators<number> {
  // exact
  if (typeof numberFilter === 'string') {
    return { $eq: Number(numberFilter) };
  }

  let filter: FilterOperators<number> = {};

  // gte or gt
  if ('gte' in numberFilter || 'gt' in numberFilter) {
    const { gt, gte } = numberFilter;
    if (typeof gt === 'string') {
      filter = { ...filter, $gt: Number(gt) };
    } else if (typeof gte === 'string') {
      filter = { ...filter, $gte: Number(gte) };
    }
  }

  // lte or lt
  if ('lte' in numberFilter || 'lt' in numberFilter) {
    const { lt, lte } = numberFilter;
    if (typeof lt === 'string') {
      filter = { ...filter, $lt: Number(lt) };
    } else if (typeof lte === 'string') {
      filter = { ...filter, $lte: Number(lte) };
    }
  }

  return filter;
}
