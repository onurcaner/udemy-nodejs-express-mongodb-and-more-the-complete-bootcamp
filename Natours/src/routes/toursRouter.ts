import express from 'express';

import { handleGetTours } from '../controllers/tours/handleGetTours';
import { checkId } from '../middlewares/checkId';

export const toursRouter = express.Router();

toursRouter.get('/', handleGetTours);
toursRouter.get('/:id', checkId, (req, res) => {
  console.log(req.params);
  console.log(req.query);
  res.json({
    asd: 'asd',
  });
});
