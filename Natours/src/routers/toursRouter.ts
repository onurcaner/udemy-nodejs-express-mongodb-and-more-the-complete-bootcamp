import express from 'express';

import { handleGetTours } from '../controllers/tours/handleGetTours';
import { checkId } from '../middlewares/checkId';

export const toursRouter = express.Router();

toursRouter.get('/', handleGetTours);
