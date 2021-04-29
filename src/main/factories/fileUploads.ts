import { UrlUploadsRepository } from '../../infra/database/mongodb/typeorm/repositories/UrlUploadsRepository';
import { LocalStorageProvider } from '../../providers/StorageProvider/implementations/LocalStorageProvider';
import { CloudStorageProvider } from '../../providers/StorageProvider/implementations/CloudStorageProvider';
import { ResizedProvider } from '../../providers/CompressImageProvider/implementation/ResizedProvider';
import { FilePathProvider } from '../../providers/FilePathProvider/implementation/FilePathProvider';

import { UploadFilesController } from '../../controller/UploadFilesController';
import { CompressImageService } from '../../services/CompressImageService';
import { HashFileProvider } from '../../providers/RandomFileProvider/HashFileProvider';
import { UploadProvider } from '../../providers/uploadProvider/UploadProvider';

export const makeUploadController = (): UploadFilesController => {
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

  const uploadProvider = new UploadProvider(
    compressImageService,
    hashFileProvider,
    filePathProvider,
  );

  return new UploadFilesController(uploadProvider);
};
