import 'dotenv/config';

import express from 'express';
import routes from './routes';

import uploadConfig from './config/upload';

import './database';

const app = express();

app.use(express.json());
app.use('/files', express.static(uploadConfig.uploadFolder));
app.use(routes);

app.listen(3333, () => {
  console.log('Executando na porta 3333');
});
