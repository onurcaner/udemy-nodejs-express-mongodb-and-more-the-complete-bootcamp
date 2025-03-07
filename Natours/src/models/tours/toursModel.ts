import { Filter, MongoClient, ObjectId } from 'mongodb';

import { Model } from '../Model';
import { CollectionNames } from '../_constants/CollectionNames';
import { mongoClient } from '../mongoClient';
import {
  type CreateTourAttributes,
  CreateTourSchema,
  type TourAttributes,
  TourSchema,
  type UpdateTourAttributes,
  UpdateTourSchema,
} from './tour-schemas-and-types';

export class ToursModel extends Model<TourAttributes> {
  constructor(mongoClient: MongoClient) {
    super({ mongoClient, collectionName: CollectionNames.Tours });
  }

  // find
  async findAll(
    filter: Filter<TourAttributes> = {},
  ): Promise<TourAttributes[]> {
    const tours = await this.collection.find().filter(filter).toArray();
    const parsedTours = tours.map((tour) => TourSchema.parse(tour));
    return parsedTours;
  }

  async findByName(name: string): Promise<TourAttributes> {
    const tour = await this.collection.findOne({ name });
    if (!tour) throw new Error(`Can not find a tour with name: ${name}`);

    const parsedTour = TourSchema.parse(tour);
    return parsedTour;
  }

  async findById(id: string): Promise<TourAttributes> {
    this.validateObjectId(id);

    const tour = await this.collection.findOne({ _id: new ObjectId(id) });
    if (!tour) throw new Error(`Can not find a tour with id: ${id}`);

    const parsedTour = TourSchema.parse(tour);
    return parsedTour;
  }

  async findByNames(names: string[]): Promise<TourAttributes[]> {
    const tours = await this.collection
      .find({
        $or: names.map((name) => ({ name })),
      })
      .toArray();

    const parsedTours = tours.map((tour) => TourSchema.parse(tour));
    return parsedTours;
  }

  // insert
  async insertOne(
    createTourFields: CreateTourAttributes,
  ): Promise<TourAttributes> {
    const existingTourWithSameName = await this.collection.findOne(
      {
        name: createTourFields.name,
      },
      { projection: { name: 1 } },
    );
    if (existingTourWithSameName)
      throw new Error(
        `Tour name is unique. "${createTourFields.name}" has already existing`,
      );

    const parsedCreateTourFields = CreateTourSchema.parse(createTourFields);
    const insertedTourId = new ObjectId();
    await this.collection.insertOne({
      ...parsedCreateTourFields,
      _id: insertedTourId,
    });

    const insertedTour = await this.findById(insertedTourId.toString());
    return insertedTour;
  }

  async insertMany(
    createTourFieldsCollection: CreateTourAttributes[],
  ): Promise<TourAttributes[]> {
    const alreadyInsertedTours = await this.collection
      .find(
        {
          $or: createTourFieldsCollection.map(({ name }) => ({ name })),
        },
        {
          projection: { name: 1 },
        },
      )
      .toArray();
    if (alreadyInsertedTours.length > 0)
      throw new Error(
        `Tour name is unique. "${alreadyInsertedTours.map(({ name }) => name).join(' ___ ')}" have already existing`,
      );

    const parsedCreateTourFieldsCollection = createTourFieldsCollection.map(
      (createTourFields) => CreateTourSchema.parse(createTourFields),
    );
    await this.collection.insertMany(
      parsedCreateTourFieldsCollection.map((parsedTour) => ({
        ...parsedTour,
        _id: new ObjectId(),
      })),
    );

    const insertedTourNames = parsedCreateTourFieldsCollection.map(
      ({ name }) => name,
    );
    const insertedTours = await this.findByNames(insertedTourNames);
    return insertedTours;
  }

  // update
  async updateTour(
    id: string,
    updateTourFields: UpdateTourAttributes,
  ): Promise<TourAttributes> {
    this.validateObjectId(id);

    const tour = await this.collection.findOne(
      { _id: new ObjectId(id) },
      { projection: { name: 1 } },
    );
    if (!tour) throw new Error(`Can not find a tour with id: ${id}`);

    const parsedUpdateFields = UpdateTourSchema.parse(updateTourFields);
    await this.collection.updateOne(
      { _id: new ObjectId(id) },
      { $set: parsedUpdateFields },
    );

    const updatedTour = await this.findById(id);
    return updatedTour;
  }

  // delete
  async deleteTour(id: string): Promise<TourAttributes> {
    this.validateObjectId(id);

    const deletedTour = await this.findById(id);
    await this.collection.deleteOne({ _id: deletedTour._id });

    return deletedTour;
  }
}

export const toursModel = new ToursModel(mongoClient);
