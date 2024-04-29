import { FallbackRequestHandler } from './types';

export const fallbackRoute: FallbackRequestHandler = (
  _request,
  response,
  html,
) => {
  response
    .writeHead(404, {
      'Content-Type': 'text/html',
    })
    .end(html ?? '<h1>Page can not be found!!</h1>');
};
