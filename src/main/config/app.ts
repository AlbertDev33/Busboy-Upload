import 'dotenv/config';
import express from 'express';

import setupMiddlewares from './middlewares';

import '../../infra/database';

const app = express();
setupMiddlewares(app);

export default app;
