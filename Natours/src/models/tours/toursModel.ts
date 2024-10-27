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

  // get
  async getAll() {
    const tours = await this.collection.find({}).toArray();
    const parsedTours = tours.map((tour) => TourSchemas.Tour.parse(tour));
    return parsedTours;
  }

  async getByName(name: string) {
    const tour = await this.collection.findOne({ name });
    if (!tour) return tour;

    const parsedTour = TourSchemas.Tour.parse(tour);
    return parsedTour;
  }

  async getById(id: string) {
    if (!ObjectId.isValid(id)) throw new Error('id is not a valid ObjectId');

    const tour = await this.collection.findOne({ _id: id });
    if (!tour) return tour;

    const parsedTour = TourSchemas.Tour.parse(tour);
    return parsedTour;
  }

  // insert
  async insertOne(tour: TourTypes['CreateTour']) {
    const existingTourWithSameName = await this.collection.findOne(
      {
        name: tour.name,
      },
      { projection: { name: 1 } },
    );
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
    const alreadyInsertedTours = await this.collection
      .find(
        {
          $or: tours.map((tour) => ({ name: tour.name })),
        },
        {
          projection: { name: 1 },
        },
      )
      .toArray();
    if (alreadyInsertedTours.length > 0)
      throw new Error(
        `tour name is unique. "${alreadyInsertedTours.map(({ name }) => name).join(' ___ ')}" have already existing`,
      );

    const parsedTours = tours.map((tour) => TourSchemas.CreateTour.parse(tour));
    const insertedTours = this.collection.insertMany(
      parsedTours.map((parsedTour) => ({ ...parsedTour, _id: new ObjectId() })),
    );
    return insertedTours;
  }
}

export const toursModel = new ToursModel(mongoClient);
