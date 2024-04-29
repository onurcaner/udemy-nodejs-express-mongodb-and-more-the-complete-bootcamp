import { IncomingMessage, ServerResponse } from 'node:http';

export type RequestHandler = (
  request: IncomingMessage,
  response: ServerResponse,
) => void;

export type FallbackRequestHandler = (
  request: IncomingMessage,
  response: ServerResponse,
  html?: string,
) => void;
