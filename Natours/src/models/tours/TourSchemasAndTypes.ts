import { z } from 'zod';

import { LocationSchema } from '../locations/LocationSchema';
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
} from '../property-schemas';

const startDatesSchema = z.array(dateStringSchema).min(1).max(20);

const startLocationSchema = z
  .object({
    address: addressSchema,
    description: descriptionSchema,
  })
  .merge(LocationSchema)
  .omit({ _id: true });

const tourLocationSchema = z
  .object({
    day: durationSchema,
    description: descriptionSchema,
  })
  .merge(LocationSchema);

const TourSchema = z.object({
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

export const TourSchemas = {
  Tour: TourSchema,
  CreateTour: TourSchema.omit({ _id: true }),
};

export interface TourTypes {
  Tour: z.infer<typeof TourSchemas.Tour>;
  CreateTour: z.infer<typeof TourSchemas.CreateTour>;
}
