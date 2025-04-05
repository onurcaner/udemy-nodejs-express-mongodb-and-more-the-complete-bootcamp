import { Filter, Sort } from 'mongodb';

import { Model } from '../Model';
import { NotFoundError } from '../_constants/Errors';
import {
  type CreateTourAttributes,
  CreateTourSchema,
  type TourAttributes,
  TourSchema,
  type UpdateTourAttributes,
  UpdateTourSchema,
} from './tour-schemas-and-types';
import { toursRepository } from './toursRepository';

export class ToursModel extends Model {
  private repository = toursRepository;

  async findAll(options: {
    filter?: Filter<TourAttributes> | null;
    sort?: Sort | null;
  }): Promise<TourAttributes[]> {
    // Find
    const tours = await this.repository.findAll(options);

    // Parse output
    const parsedTours = tours.map((tour) => TourSchema.parse(tour));
    return parsedTours;
  }

  async findByName(name: string): Promise<TourAttributes> {
    // Find
    const tour = await this.repository.findByName(name);
    if (!tour)
      throw new NotFoundError(`Can not find a tour with name: ${name}`);

    // Parse output
    const parsedTour = TourSchema.parse(tour);
    return parsedTour;
  }

  async findById(id: string): Promise<TourAttributes> {
    // Validate
    this.validateObjectId(id);

    // Find
    const tour = await this.repository.findById(id);
    if (!tour) throw new NotFoundError(`Can not find a tour with id: ${id}`);

    // Parse
    const parsedTour = TourSchema.parse(tour);
    return parsedTour;
  }

  async findByNames(names: string[]): Promise<TourAttributes[]> {
    // Find
    const tours = await this.repository.findAll({
      filter: {
        $or: names.map((name) => ({ name })),
      },
    });

    // Parse
    const parsedTours = tours.map((tour) => TourSchema.parse(tour));
    return parsedTours;
  }

  async insertOne(
    createTourAttributes: CreateTourAttributes,
  ): Promise<TourAttributes> {
    // Validate
    const parsedCreateTourAttributes =
      CreateTourSchema.parse(createTourAttributes);

    // Insert
    const insertedTour = await this.repository.insertOne(
      parsedCreateTourAttributes,
    );

    // Parse
    const parsedTour = TourSchema.parse(insertedTour);
    return parsedTour;
  }

  async insertMany(
    createTourFieldsCollection: CreateTourAttributes[],
  ): Promise<TourAttributes[]> {
    // Validate
    const parsedCreateTourAttributesCollection = createTourFieldsCollection.map(
      (createTourFields) => CreateTourSchema.parse(createTourFields),
    );

    // Insert
    const insertedTours = await this.repository.insertMany(
      parsedCreateTourAttributesCollection,
    );

    // Parse
    const parsedInsertedTours = insertedTours.map((insertedTour) =>
      TourSchema.parse(insertedTour),
    );
    return parsedInsertedTours;
  }

  async update(
    id: string,
    updateTourFields: UpdateTourAttributes,
  ): Promise<TourAttributes> {
    // Validate
    this.validateObjectId(id);
    const parsedUpdateFields = UpdateTourSchema.parse(updateTourFields);

    // Update
    const updatedTour = await this.repository.update(id, parsedUpdateFields);

    // Parse
    const parsedUpdatedTour = TourSchema.parse(updatedTour);
    return parsedUpdatedTour;
  }

  // delete
  async delete(id: string): Promise<void> {
    // Validate
    this.validateObjectId(id);

    // Delete
    await this.repository.delete(id);
  }
}

export const toursModel = new ToursModel();
