import { renderProduct } from '../templates/product/renderProduct';
import { createUrl } from './createUrl';
import { fallbackRoute } from './fallbackRoute';
import { RequestHandler } from './types';

export const productRoute: RequestHandler = (request, response) => {
  const url = createUrl(request);
  const id = url.searchParams.get('id');

  if (!id) {
    fallbackRoute(
      request,
      response,
      '<h1>No id can be found in URL searchParams</h1>',
    );
    return;
  }

  renderProduct(+id)
    .then((html) => {
      response.writeHead(200, { 'Content-Type': 'text/html' }).end(html);
    })
    .catch((error: unknown) => {
      const message =
        (error as Error | null)?.message ?? '<h1>Product does not exist</h1>';
      fallbackRoute(request, response, message);
    });
};
