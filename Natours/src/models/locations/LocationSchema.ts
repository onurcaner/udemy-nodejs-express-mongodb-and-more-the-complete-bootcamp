import { z } from 'zod';

import {
  coordinateTypeSchema,
  idSchema,
  pointCoordinatesSchema,
} from '../property-schemas';

const pointSchema = z.object({
  coordinates: pointCoordinatesSchema,
  type: coordinateTypeSchema.extract(['point']),
});

export const LocationSchema = z
  .object({
    _id: idSchema,
  })
  .merge(pointSchema);
