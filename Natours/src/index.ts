import 'dotenv/config';
import express from 'express';
import morgan from 'morgan';
import { env } from 'node:process';
import serveStatic from 'serve-static';

import { ROOT } from './ROOT';
import { routers } from './routers/routers';

const port = Number.parseInt(env.PORT ?? '8000');
const app = express();

if (env.NODE_ENV?.startsWith('development')) {
  app.use(morgan('dev'));
}

app.use(serveStatic(`${ROOT}/public`));
app.use('/api/tours', routers.tours);

app.listen(port, () => {
  console.log(`Starting ${env.NODE_ENV ?? ''} server`);
  console.log(`Express is listening on port ${String(port)}`);
});
