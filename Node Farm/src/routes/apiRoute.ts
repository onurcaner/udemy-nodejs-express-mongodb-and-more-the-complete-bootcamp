import { products } from '../products';
import { RequestHandler } from './types';

export const apiRoute: RequestHandler = (_request, response) => {
  response
    .writeHead(200, { 'Content-Type': 'application/json' })
    .end(JSON.stringify(products));
};
