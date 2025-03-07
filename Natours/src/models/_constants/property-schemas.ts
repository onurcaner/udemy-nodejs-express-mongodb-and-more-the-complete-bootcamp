import { ObjectId } from 'mongodb';
import { z } from 'zod';

export const idSchema = z.union([
  z.instanceof(ObjectId),
  z.custom<string>((id) => typeof id === 'string' && ObjectId.isValid(id)),
]);

export const addressSchema = z.string().min(5).max(1000);
export const coordinateTypeSchema = z.enum(['point']);
export const dateStringSchema = z.string().datetime();
export const durationSchema = z.number().min(1).max(365);
export const descriptionSchema = z.string().min(5).max(1000);
export const difficultySchema = z.enum(['easy', 'medium', 'difficult']);
export const imageSchema = z.string().min(1).max(1000);
export const latitudeSchema = z.number().min(-90).max(90);
export const longitudeSchema = z.number().min(-180).max(180);
export const pointCoordinatesSchema = z.tuple([
  longitudeSchema,
  latitudeSchema,
]);
export const maxGroupSizeSchema = z.number().min(1).max(100);
export const nameSchema = z.string().min(2).max(100);
export const priceSchema = z.number().min(1).safe();
export const ratingSchema = z.number().min(0).max(5);
export const quantitySchema = z.number().min(0).safe();
