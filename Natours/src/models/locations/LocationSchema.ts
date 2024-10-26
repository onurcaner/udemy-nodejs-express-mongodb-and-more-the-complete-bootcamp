import { ObjectId } from 'mongodb';
import { z } from 'zod';

const LatitudeLongitudeSchema = z.tuple([
  z
    .number({
      required_error: 'longitude is required',
      invalid_type_error: 'longitude must be number',
    })
    .min(-180, 'longitude must be at least -180')
    .max(180, 'longitude must be at most 180'),
  z
    .number({
      required_error: 'latitude is required',
      invalid_type_error: 'latitude must be number',
    })
    .min(-90, 'latitude must be at least -90')
    .max(90, 'latitude must be at most 90'),
]);

export const LocationSchema = z.object({
  _id: z.instanceof(ObjectId),
  coordinates: LatitudeLongitudeSchema,
  type: z.enum(['point']),
});
