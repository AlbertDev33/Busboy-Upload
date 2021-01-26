import 'dotenv/config';

import express from 'express';
import routes from './routes';

import './database';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(routes);

app.listen(3333, () => {
  console.log('Executando na porta 3333');
});