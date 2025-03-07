import { Collection, MongoClient, ObjectId } from 'mongodb';

export abstract class Model<T extends Record<'_id', string | ObjectId>> {
  protected collection: Collection<T>;

  constructor({
    mongoClient,
    collectionName,
  }: {
    mongoClient: MongoClient;
    collectionName: string;
  }) {
    this.collection = mongoClient.db().collection<T>(collectionName);
  }

  protected validateObjectId(id: string): void {
    if (ObjectId.isValid(id)) return;
    else throw new Error(`id: ${id} is not a valid ObjectId`);
  }
}
