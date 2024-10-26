import { Collection, MongoClient, ObjectId } from 'mongodb';

import { CollectionNames } from '../CollectionNames';
import { mongoClient } from '../mongoClient';
import { TourSchemas, TourTypes } from './TourSchemasAndTypes';

export class ToursModel {
  private collection: Collection<TourTypes['Tour']>;
  constructor(mongoClient: MongoClient) {
    this.collection = mongoClient
      .db()
      .collection<TourTypes['Tour']>(CollectionNames.Tours);
  }

  async getAll() {
    return await this.collection.find({}).toArray();
  }

  async getByName(name: string) {
    return await this.collection.findOne({ name });
  }

  async insertOne(tour: TourTypes['CreateTour']) {
    const existingTourWithSameName = await this.getByName(tour.name);
    if (existingTourWithSameName)
      throw new Error(
        `tour name is unique. "${tour.name}" has already existing`,
      );

    const parsedTour = TourSchemas.CreateTour.parse(tour);
    const insertedTour = await this.collection.insertOne({
      ...parsedTour,
      _id: new ObjectId(),
    });

    return insertedTour;
  }

  async insertMany(tours: TourTypes['CreateTour'][]) {
    return await Promise.all(tours.map((tour) => this.insertOne(tour)));
  }
}

export const toursModel = new ToursModel(mongoClient);
