import 'dotenv/config';
import express from 'express';
import morgan from 'morgan';
import serveStatic from 'serve-static';

import { ROOT } from './ROOT';
import { toursRouter } from './routers/toursRouter';

const port = +(process.env.PORT ?? '8000');
const app = express();

if (process.env.NODE_ENV?.startsWith('development')) {
  app.use(morgan('dev'));
}

app.use(serveStatic(`${ROOT}/public`));
app.use('/api/tours', toursRouter);

app.listen(port, () => {
  console.log(`Starting ${process.env.NODE_ENV ?? ''} server`);
  console.log(`Express is listening on port ${String(port)}`);
});
