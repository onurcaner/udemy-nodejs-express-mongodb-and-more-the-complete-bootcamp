import { NextFunction, Request, Response } from 'express';

type RequestWithParams = Request & Pick<Request, 'params'>;
interface RequestWithIdParams extends RequestWithParams {
  params: { id: string };
}

export type ExpressHandler = (
  req: Request,
  res: Response,
  next: NextFunction,
) => void;

export type ExpressHandlerWithParams = (
  req: RequestWithParams,
  res: Response,
  next: NextFunction,
) => void;

export type ExpressHandlerWithIdParams = (
  req: RequestWithIdParams,
  res: Response,
  next: NextFunction,
) => void;
