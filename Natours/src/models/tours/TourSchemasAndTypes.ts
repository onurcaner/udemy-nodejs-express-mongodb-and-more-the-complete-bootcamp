import { ObjectId } from 'mongodb';
import { z } from 'zod';

import { LocationSchema } from '../locations/LocationSchema';

const StartLocationSchema = z
  .object({
    address: z
      .string({
        required_error: 'start location address is required',
        invalid_type_error: 'start location address must be string',
      })
      .min(10, 'start location address must be at least 10 character long')
      .max(1000, 'start location address must be at most 1000 characters long'),
    description: z
      .string({
        required_error: 'start location description is required',
        invalid_type_error: 'start location description must be string',
      })
      .min(10, 'start location description must be at least 10 characters long')
      .max(
        1000,
        'start location description must be at most 1000 characters long',
      ),
  })
  .merge(LocationSchema)
  .omit({ _id: true });

const TourLocationSchema = z
  .object({
    _id: z.instanceof(ObjectId),
    day: z
      .number({
        required_error: 'location days is required',
        invalid_type_error: 'location days must be number',
      })
      .min(1, 'location day must be at least 1 days')
      .max(28, 'location day must be at most 28 days'),
    description: z
      .string({
        required_error: 'location description is required',
        invalid_type_error: 'location description must be string',
      })
      .min(1, 'location description must be at least 1 characters')
      .max(1000, 'location description must be at most 1000 characters'),
  })
  .merge(LocationSchema);

const TourSchema = z.object({
  _id: z.instanceof(ObjectId),

  duration: z
    .number({
      required_error: 'duration is required',
      invalid_type_error: 'duration must be number',
    })
    .min(2, 'duration must be at least 2 days')
    .max(28, 'duration must be at most 28 days'),

  difficulty: z.enum(['easy', 'medium', 'difficult'], {
    required_error: 'difficulty is required',
    invalid_type_error: 'difficulty must be easy OR medium OR difficult',
  }),

  description: z
    .string({
      required_error: 'description is required',
      invalid_type_error: 'description must be string',
    })
    .min(10, 'description must be at least 10 characters')
    .max(1000, 'description must be at most 1000 characters'),

  guides: z
    .array(z.instanceof(ObjectId), {
      required_error: 'guides are required',
      invalid_type_error: 'guides must be Array<ObjectId>',
    })
    .min(1, 'guides must be at least 1 person')
    .max(10, 'guides must be at most 10 people'),

  images: z
    .array(
      z
        .string({
          required_error: 'image is required',
          invalid_type_error: 'image must be string',
        })
        .min(1, 'image url must be at least 1 character')
        .max(1000, 'image url must be at most 1000 characters'),
      {
        required_error: 'images are required',
        invalid_type_error: 'images must be Array<string>',
      },
    )
    .min(1, 'images must be at least 1 image')
    .max(100, 'images must be at most 100 images'),

  image_cover: z
    .string({
      required_error: 'image cover is required',
      invalid_type_error: 'image cover must be string',
    })
    .min(1, 'cover image url must be at least 1 character')
    .max(1000, 'cover image url must be at most 1000 characters'),

  locations: z
    .array(TourLocationSchema, {
      required_error: 'locations are required',
      invalid_type_error: 'locations must be Array<TourLocationSchema>',
    })
    .min(1, 'locations must be at least 1 location')
    .max(20, 'locations must be at most 20 locations'),

  max_group_size: z
    .number({
      required_error: 'max group size is required',
      invalid_type_error: 'max group size must be number',
    })
    .min(2, 'max group size must be at least 2 person')
    .max(100, 'max group size must be at most 100 people'),

  name: z
    .string({
      required_error: 'name is required',
      invalid_type_error: 'name must be string',
    })
    .min(3, 'name must be at least 3 character')
    .max(100, 'name must be at most 100 characters'),

  price: z
    .number({
      required_error: 'price is required',
      invalid_type_error: 'price must be number',
    })
    .min(1, 'price must be at least 1')
    .max(4294967296, 'price must be at most 4294967296'),

  ratings_average: z
    .number({
      required_error: 'ratings average is required',
      invalid_type_error: 'ratings average must be number',
    })
    .min(0, 'rating average must be at least 0')
    .max(5, 'rating average must be at most 5'),

  ratings_quantity: z
    .number({
      required_error: 'ratings quantity is required',
      invalid_type_error: 'ratings quantity must be number',
    })
    .min(0, 'rating quantity must be at least 0')
    .max(4294967296, 'rating quantity must be at most 4294967296'),

  start_dates: z
    .array(z.string().datetime(), {
      required_error: 'start dates are required',
      invalid_type_error: 'start dates must be Array<ISO string>',
    })
    .min(1, 'start dates must be at least 1 iso string')
    .max(20, 'start dates must be at most 20 iso string'),

  start_location: z
    .object(
      {},
      {
        required_error: 'start location is required',
        invalid_type_error: 'start location must be StartLocationSchema',
      },
    )
    .merge(StartLocationSchema),

  summary: z
    .string()
    .min(10, 'description must be at least 10 characters long')
    .max(1000, 'description must be at most 1000 characters long'),
});

export const TourSchemas = {
  Tour: TourSchema,
  CreateTour: TourSchema.omit({ _id: true }),
};

export interface TourTypes {
  Tour: z.infer<typeof TourSchemas.Tour>;
  CreateTour: z.infer<typeof TourSchemas.CreateTour>;
}
