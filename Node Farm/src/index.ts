import { createServer } from 'node:http';

import { PORT } from './config';
import { products } from './products';

const server = createServer((request, response) => {
  console.log(request.url);
  switch (request.url) {
    case '/':
    case '/overview': {
      response.end('overview');
      return;
    }

    case '/product': {
      response.end('product');
      return;
    }

    case '/api': {
      response
        .writeHead(200, { 'Content-Type': 'application/json' })
        .end(JSON.stringify(products));
      return;
    }

    default: {
      response
        .writeHead(404, {
          'Content-Type': 'text/html',
          'My-Custom-Header': 'my-custom-message',
        })
        .end('<h1>Page can not be found!!</h1>');
      return;
    }
  }
});

server.listen(PORT, () => {
  console.log('Listening port:', PORT);
});
