import { renderOverview } from '../templates/overview/renderOverview';
import { fallbackRoute } from './fallbackRoute';
import { RequestHandler } from './types';

export const overviewRoute: RequestHandler = (request, response) => {
  renderOverview()
    .then((html) => {
      response.writeHead(200, { 'Content-Type': 'text/html' }).end(html);
    })
    .catch(() => {
      fallbackRoute(request, response, '<h1>Can not retrieve overview</h1>');
    });
};
