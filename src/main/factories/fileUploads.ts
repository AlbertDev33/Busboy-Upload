import { UploadBusboyController } from '../../controller/UploadBusboyController';
import { CompressImageService } from '../../services/CompressImageService';
import { HashFileProvider } from '../../providers/RandomFileProvider/HashFileProvider';

export const makeUploadController = (): UploadBusboyController => {
  const compressImageService = new CompressImageService();
  const hashFileProvider = new HashFileProvider();

  return new UploadBusboyController(compressImageService, hashFileProvider);
};
