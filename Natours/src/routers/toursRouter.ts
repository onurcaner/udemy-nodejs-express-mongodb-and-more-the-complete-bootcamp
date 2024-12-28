import express from 'express';

import { handleGetTourById } from '../controllers/tours/handleGetTourById';
import { handleGetTours } from '../controllers/tours/handleGetTours';
import { checkId } from '../middlewares/checkId';

export const toursRouter = express.Router();

toursRouter.get('/', handleGetTours);
toursRouter.get('/:id', checkId, handleGetTourById);
