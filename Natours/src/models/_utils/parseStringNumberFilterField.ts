import { type FilterOperators } from 'mongodb';

import { type StringNumberFilter } from '../_constants/stringNumberFilterSchema';

export function parseStringNumberFilterField(
  filterOption?: StringNumberFilter,
): FilterOperators<number> {
  let filter: FilterOperators<number> = {};

  // no filter
  if (!filterOption) return filter;

  // exact
  if (typeof filterOption === 'string') {
    filter = { ...filter, $eq: Number(filterOption) };
    return filter;
  }

  // GTe
  if ('gte' in filterOption || 'gt' in filterOption) {
    const { gt, gte } = filterOption;
    if (typeof gt === 'string') {
      filter = { ...filter, $gt: Number(gt) };
    } else if (typeof gte === 'string') {
      filter = { ...filter, $gte: Number(gte) };
    }
  }

  // LTe
  if ('lte' in filterOption || 'lt' in filterOption) {
    const { lt, lte } = filterOption;
    if (typeof lt === 'string') {
      filter = { ...filter, $lt: Number(lt) };
    } else if (typeof lte === 'string') {
      filter = { ...filter, $lte: Number(lte) };
    }
  }

  return filter;
}
