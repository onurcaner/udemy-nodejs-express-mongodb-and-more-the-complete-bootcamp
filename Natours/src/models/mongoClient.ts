import { MongoClient } from 'mongodb';

import { typedEnv } from '../constants/typedEnv';

const url = typedEnv.MONGODB_ATLAS_URL;
const password = typedEnv.MONGODB_ATLAS_PASSWORD;

export const mongoClient = new MongoClient(
  url.replace('<MONGODB_PASSWORD>', password),
);
