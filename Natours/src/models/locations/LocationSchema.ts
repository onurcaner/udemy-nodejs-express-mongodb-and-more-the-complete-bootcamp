import { z } from 'zod';

import {
  coordinateTypeSchema,
  idSchema,
  pointCoordinatesSchema,
} from '../_constants/property-schemas';

const pointSchema = z.object({
  coordinates: pointCoordinatesSchema,
  type: coordinateTypeSchema.extract(['point']),
});

export const locationSchema = z
  .object({
    _id: idSchema,
  })
  .merge(pointSchema);
