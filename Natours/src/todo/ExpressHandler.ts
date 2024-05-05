import { NextFunction, Request, Response } from 'express';

export type ExpressHandler = (
  request: Request,
  response: Response,
  next: NextFunction,
) => void;
