import { IRequest, IResponse } from '@src/main/ExpressHttpRequest/HttpRequest';
import { Router } from 'express';

import { makeUploadController } from '../factories/fileUploads';

const routes = Router();

routes.post('/files', async (request: IRequest, response: IResponse) => {
  await makeUploadController().create(request, response);
});

export default routes;
