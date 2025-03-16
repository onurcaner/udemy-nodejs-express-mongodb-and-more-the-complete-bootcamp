import { validSortOrders } from '../_constants/validSortOrders';

/**
 *
 * @param sortBy string like "by_price.asc,average_rating.dsc"
 * @returns "{ by_price: 1, average_rating: -1 }"
 */
export function parseSortByValue(
  sortBy: string,
): Record<string, 1 | -1> | null {
  if (!sortBy) return null;

  const entries: [string, 1 | -1][] = sortBy
    .split(',')
    .filter((maybeValid) => Boolean(maybeValid))
    .filter((mayHaveDot) => mayHaveDot.includes('.'))
    .map((haveDot) => haveDot.split('.').slice(0, 2))
    .filter(([maybeValidKey]) => Boolean(maybeValidKey))
    .filter(([, maybeValidOrder]) => validSortOrders.includes(maybeValidOrder))
    .map(([key, order]) => [key, order === 'asc' ? 1 : -1]);

  if (entries.length === 0) return null;
  return Object.fromEntries(entries);
}
