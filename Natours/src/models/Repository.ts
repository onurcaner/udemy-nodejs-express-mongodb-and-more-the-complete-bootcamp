import { Collection, MongoClient, ObjectId } from 'mongodb';

export abstract class Repository<T extends Record<'_id', string | ObjectId>> {
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
}
