import { readFile } from 'node:fs/promises';

import { ROOT } from '../ROOT';

export async function readTours(): Promise<Tour[]> {
  const json = await readFile(`${ROOT}/dev-data/data/tours.json`, {
    encoding: 'utf8',
  });
  const tours = await Promise.resolve(JSON.parse(json) as Tour[]);
  return tours;
}

export interface Location {
  description: string;
  type: string;
  coordinates: [number, number];
  address?: string;
  day?: number;
}

export interface Tour {
  startLocation: Location;
  ratingsAverage: number;
  ratingsQuantity: number;
  images: string[];
  startDates: string[];
  _id: string;
  name: string;
  duration: number;
  maxGroupSize: number;
  difficulty: string;
  guides: string[];
  price: number;
  summary: string;
  description: string;
  imageCover: string;
  locations: Location[];
}
