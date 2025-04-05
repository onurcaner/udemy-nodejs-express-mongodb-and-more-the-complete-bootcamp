import { type Filter, MongoClient, ObjectId, type Sort } from 'mongodb';

import { Repository } from '../Repository';
import { CollectionNames } from '../_constants/CollectionNames';
import { AlreadyExistingError, NotFoundError } from '../_constants/Errors';
import { mongoClient } from '../mongoClient';
import {
  type CreateTourAttributes,
  type TourAttributes,
  type UpdateTourAttributes,
} from './tour-schemas-and-types';

export class ToursRepository extends Repository<TourAttributes> {
  constructor(mongoClient: MongoClient) {
    super({ mongoClient, collectionName: CollectionNames.Tours });
  }

  // Find
  async findAll({
    filter,
    sort,
  }: {
    filter?: Filter<TourAttributes> | null;
    sort?: Sort | null;
  }): Promise<TourAttributes[]> {
    let toursFindCursor = this.collection.find();
    if (filter) toursFindCursor = toursFindCursor.filter(filter);
    if (sort) toursFindCursor = toursFindCursor.sort(sort);

    const tours = await toursFindCursor.toArray();
    return tours;
  }

  async findByName(name: string): Promise<TourAttributes | null> {
    const tour = await this.collection.findOne({ name });
    return tour;
  }

  async findById(id: string): Promise<TourAttributes | null> {
    const tour = await this.collection.findOne({ _id: id });
    return tour;
  }

  async findByNames(names: string[]): Promise<TourAttributes[]> {
    const tours = await this.collection
      .find({
        $or: names.map((name) => ({ name })),
      })
      .toArray();
    return tours;
  }

  // Insert
  async insertOne(
    createTourAttributes: CreateTourAttributes,
  ): Promise<TourAttributes | null> {
    const existingTourWithSameName = await this.collection.countDocuments(
      {
        name: createTourAttributes.name,
      },
      {
        limit: 1,
      },
    );
    if (existingTourWithSameName > 0)
      throw new AlreadyExistingError(
        `Tour name is unique. "${createTourAttributes.name}" already exists`,
      );

    await this.collection.insertOne({
      ...createTourAttributes,
      _id: new ObjectId(),
    });

    const insertedTour = await this.findByName(createTourAttributes.name);
    return insertedTour;
  }

  async insertMany(
    createTourAttributesCollection: CreateTourAttributes[],
  ): Promise<TourAttributes[]> {
    const existingToursWithSameName = await this.collection
      .find(
        {
          $or: createTourAttributesCollection.map(({ name }) => ({ name })),
        },
        {
          projection: { name: 1 },
        },
      )
      .toArray();
    if (existingToursWithSameName.length > 0)
      throw new AlreadyExistingError(
        `Tour name is unique. "${existingToursWithSameName.map(({ name }) => name).join(' , ')}" already exist`,
      );

    await this.collection.insertMany(
      createTourAttributesCollection.map((createTourAttributes) => ({
        ...createTourAttributes,
        _id: new ObjectId(),
      })),
    );

    const insertedTourNames = createTourAttributesCollection.map(
      ({ name }) => name,
    );
    const insertedTours = await this.findByNames(insertedTourNames);
    return insertedTours;
  }

  // Update
  async update(
    id: string,
    updateTourFields: UpdateTourAttributes,
  ): Promise<TourAttributes | null> {
    const doesTourExists = await this.checkExistence(id);
    if (!doesTourExists)
      throw new NotFoundError(`Can not find a tour with id: ${id}`);

    await this.collection.updateOne({ _id: id }, { $set: updateTourFields });

    const updatedTour = await this.findById(id);
    return updatedTour;
  }

  // Delete
  async delete(id: string): Promise<void> {
    const doesTourExist = await this.checkExistence(id);
    if (!doesTourExist)
      throw new NotFoundError(`Can not find a tour with id: ${id}`);

    await this.collection.deleteOne({ _id: id });
  }

  // Helpers
  private async checkExistence(id: string): Promise<boolean> {
    const count = await this.collection.countDocuments(
      { _id: id },
      { limit: 1 },
    );
    return count > 0;
  }
}

export const toursRepository = new ToursRepository(mongoClient);
