import 'dotenv/config';
import express from 'express';
import morgan from 'morgan';
import serveStatic from 'serve-static';

import { ROOT } from './ROOT';
import { toursRouter } from './routes/toursRouter';

const port = +(process.env.PORT ?? '8000');
const app = express();
console.log(process.env.NODE_ENV);
if (process.env.NODE_ENV === 'development') {
  console.log('here');
  app.use(morgan('dev'));
}
app.use(serveStatic(`${ROOT}/public`));

app.use('/api/tours', toursRouter);

app.listen(port, () => {
  console.log(`Express is listening on port ${String(port)}`);
});
