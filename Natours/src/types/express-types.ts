import { type NextFunction, type Request, type Response } from 'express';

export type ExpressHandler = (
  req: Request,
  res: Response,
  next: NextFunction,
) => void;

export type ExpressHandlerWithBody<T> = (
  req: Request<null, null, T>,
  res: Response,
  next: NextFunction,
) => void;

export type ExpressHandlerWithIdParams = (
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction,
) => void;

export type ExpressHandlerWithIdParamsAndBody<T> = (
  req: Request<{ id: string }, null, T>,
  res: Response,
  next: NextFunction,
) => void;
