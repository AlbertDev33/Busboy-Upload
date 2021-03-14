import { UrlUploadsRepository } from '../../infra/database/mongodb/typeorm/repositories/UrlUploadsRepository';
import { LocalStorageProvider } from '../../providers/StorageProvider/implementations/LocalStorageProvider';
import { CloudStorageProvider } from '../../providers/StorageProvider/implementations/CloudStorageProvider';
import { ResizedProvider } from '../../providers/CompressImageProvider/implementation/ResizedProvider';
import { FilePathProvider } from '../../providers/FilePathProvider/implementation/FilePathProvider';

import { UploadBusboyController } from '../../controller/UploadBusboyController';
import { CompressImageService } from '../../services/CompressImageService';
import { HashFileProvider } from '../../providers/RandomFileProvider/HashFileProvider';

export const makeUploadController = (): UploadBusboyController => {
  const urlUploadsRepository = new UrlUploadsRepository();
  const localStorageProvider = new LocalStorageProvider();
  const cloudStorageProvider = new CloudStorageProvider();
  const resizedProvider = new ResizedProvider();
  const filePathProvider = new FilePathProvider();

  const compressImageService = new CompressImageService(
    urlUploadsRepository,
    localStorageProvider,
    cloudStorageProvider,
    resizedProvider,
    filePathProvider,
  );
  const hashFileProvider = new HashFileProvider();

  return new UploadBusboyController(
    compressImageService,
    hashFileProvider,
    filePathProvider,
  );
};
