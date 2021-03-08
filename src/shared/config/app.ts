import 'dotenv/config';
import express from 'express';

import routes from '../../routes';

import uploadConfig from '../../config/upload';
import setupMiddlewares from './middlewares';

import '../../database';

const app = express();
setupMiddlewares(app);
app.use('/files', express.static(uploadConfig.uploadFolder));
app.use(routes);

export default app;
