import { MongoClient } from 'mongodb';
import { env } from 'node:process';

const url = env.MONGODB_ATLAS_URL;
if (!url) throw new Error('MONGODB_ATLAS_URL can not be found in .env');
const password = env.MONGODB_ATLAS_PASSWORD;
if (!password)
  throw new Error('MONGODB_ATLAS_PASSWORD can not be found in .env');

export const mongoClient = new MongoClient(
  url.replace('<MONGODB_PASSWORD>', password),
);
