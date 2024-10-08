import { readFile } from 'node:fs/promises';

import { dataPaths } from '../dataPaths';
import { Tour } from './tours-types';

export async function readTours(): Promise<Tour[]> {
  try {
    const json = await readFile(dataPaths.tours, {
      encoding: 'utf8',
    });
    const tours = await Promise.resolve(JSON.parse(json) as Tour[]);
    return tours;
  } catch {
    throw new Error('Can not read tours from server');
  }
}
