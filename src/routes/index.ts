import {
  IRequest,
  IResponse,
} from '@src/shared/ExpressHttpRequest/HttpRequest';
import { Router } from 'express';

import UploadBusboyController from '../controller/UploadBusboyController';

const routes = Router();
const uploadBusBoyController = new UploadBusboyController();

routes.post('/files', (request: IRequest, response: IResponse) => {
  uploadBusBoyController.create(request, response);
});

export default routes;
