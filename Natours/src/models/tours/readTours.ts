import { readFile } from 'node:fs/promises';

import { ROOT } from '../../ROOT';
import { Tour } from './tours-types';

export async function readTours(): Promise<Tour[]> {
  const json = await readFile(`${ROOT}/dev-data/data/tours.json`, {
    encoding: 'utf8',
  });
  const tours = await Promise.resolve(JSON.parse(json) as Tour[]);
  return tours;
}
