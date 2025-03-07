import express from 'express';
import morgan from 'morgan';
import serveStatic from 'serve-static';

import { ROOT } from './constants/ROOT';
import { typedEnv } from './constants/typedEnv';
import { routers } from './routers/routers';

export function startServer(): void {
  const port = typedEnv.PORT;
  const nodeEnv = typedEnv.NODE_ENV;
  const app = express();

  if (nodeEnv === 'development') {
    app.use(morgan('dev'));
  }

  app.use(serveStatic(`${ROOT}/public`));
  app.use('/api/tours', routers.tours);

  app.listen(port, () => {
    console.log(`Starting ${nodeEnv} server`);
    console.log(`Express is listening on port ${String(port)}`);
  });
}
