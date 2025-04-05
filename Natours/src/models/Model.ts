import { ObjectId } from 'mongodb';

import { InvalidIdError } from './_constants/Errors';

export class Model {
  protected validateObjectId(id: string): void {
    if (ObjectId.isValid(id)) return;
    else throw new InvalidIdError(`id: ${id} is not a valid ObjectId`);
  }
}
