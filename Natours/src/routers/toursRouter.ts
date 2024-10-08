import express from 'express';

import { handleGetTour } from '../controllers/tours/handleGetTour';
import { handleGetTours } from '../controllers/tours/handleGetTours';
import { checkId } from '../middlewares/checkId';

export const toursRouter = express.Router();

toursRouter.get('/', handleGetTours);
toursRouter.get('/:id', checkId, handleGetTour);
