import { z } from 'zod';

import {
  addressSchema,
  dateStringSchema,
  descriptionSchema,
  difficultySchema,
  durationSchema,
  idSchema,
  imageSchema,
  maxGroupSizeSchema,
  nameSchema,
  priceSchema,
  quantitySchema,
  ratingSchema,
} from '../_constants/property-schemas';
import { locationSchema } from '../locations/locationSchema';

const startDatesSchema = z.array(dateStringSchema).min(1).max(20);

const startLocationSchema = z
  .object({
    address: addressSchema,
    description: descriptionSchema,
  })
  .merge(locationSchema)
  .omit({ _id: true });

const tourLocationSchema = z
  .object({
    day: durationSchema,
    description: descriptionSchema,
  })
  .merge(locationSchema);

export const TourSchema = z.object({
  _id: idSchema,
  duration: durationSchema,
  description: descriptionSchema,
  difficulty: difficultySchema,
  guides: z.array(idSchema).min(1).max(100),
  images: z.array(imageSchema).min(1).max(100),
  image_cover: imageSchema,
  locations: z.array(tourLocationSchema).min(1).max(20),
  max_group_size: maxGroupSizeSchema,
  name: nameSchema,
  price: priceSchema,
  ratings_average: ratingSchema,
  ratings_quantity: quantitySchema,
  start_dates: startDatesSchema,
  start_location: startLocationSchema,
  summary: descriptionSchema,
});

export const CreateTourSchema = TourSchema.omit({ _id: true });
export const UpdateTourSchema = TourSchema.omit({ _id: true }).partial();

export type TourAttributes = z.infer<typeof TourSchema>;
export type CreateTourAttributes = z.infer<typeof CreateTourSchema>;
export type UpdateTourAttributes = z.infer<typeof UpdateTourSchema>;
