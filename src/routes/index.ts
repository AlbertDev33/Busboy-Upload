import { Router } from 'express';
// import multer from 'multer';

import UploadBusboyController from '../controller/UploadBusboyController';

// import uploadConfig from '../config/upload';

const routes = Router();
// const upload = multer(uploadConfig.multer);
const uploadBusBoyController = new UploadBusboyController();

routes.post('/files', uploadBusBoyController.create);

export default routes;
