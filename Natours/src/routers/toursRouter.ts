import bodyParser from 'body-parser';
import express from 'express';

import { handleCreateTour } from '../controllers/tours/handleCreateTour';
import { handleDeleteTour } from '../controllers/tours/handleDeleteTour';
import { handleGetTourById } from '../controllers/tours/handleGetTourById';
import { handleGetTours } from '../controllers/tours/handleGetTours';
import { handleUpdateTour } from '../controllers/tours/handleUpdateTour';
import { checkId } from '../middlewares/checkId';

export const toursRouter = express
  .Router()
  .get('/', handleGetTours)
  .get('/:id', checkId, handleGetTourById)
  .post('/', bodyParser.json(), handleCreateTour)
  .patch('/:id', checkId, bodyParser.json(), handleUpdateTour)
  .delete('/:id', checkId, handleDeleteTour);
