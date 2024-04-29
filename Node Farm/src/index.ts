import { createServer } from 'node:http';

import { PORT } from './config';
import { apiRoute } from './routes/apiRoute';
import { createUrl } from './routes/createUrl';
import { fallbackRoute } from './routes/fallbackRoute';
import { overviewRoute } from './routes/overviewRoute';
import { productRoute } from './routes/productRoute';

const server = createServer((request, response) => {
  const url = createUrl(request);
  console.log(url.pathname + url.search);

  switch (url.pathname) {
    case '/':
    case '/overview': {
      overviewRoute(request, response);
      return;
    }

    case '/product': {
      productRoute(request, response);
      return;
    }

    case '/api': {
      apiRoute(request, response);
      return;
    }

    default: {
      fallbackRoute(request, response);
      return;
    }
  }
});

server.listen(PORT, () => {
  console.log('Listening port:', PORT);
});
