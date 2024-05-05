import 'dotenv/config';
import express from 'express';

import { handleTours } from './todo/handleTours';

const port = process.env.PORT;
const app = express();
app.use(express.static('public'));

app.get('/', (_request, response) => {
  response.send('Hello World!');
});

app.get('/api/tours', handleTours);

app.listen(port, () => {
  console.log(`Express is listening on port ${String(port)}`);
});
