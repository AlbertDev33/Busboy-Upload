import express, { Express } from 'express';

import routes from '../../routes';

import uploadConfig from '../../config/upload';

export default (app: Express): void => {
  app.use(express.json());
  app.use('/files', express.static(uploadConfig.uploadFolder));
  app.use(routes);
};
