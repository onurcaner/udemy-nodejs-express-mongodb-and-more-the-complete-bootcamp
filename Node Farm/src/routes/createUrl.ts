import { IncomingMessage } from 'node:http';

export const createUrl = (request: IncomingMessage): URL => {
  const requestUrl = request.url;
  const host = request.headers.host;
  if (!requestUrl) throw new Error('Request is not valid');
  if (!host) throw new Error('No host');

  return new URL(requestUrl, `http://${host}`);
};
