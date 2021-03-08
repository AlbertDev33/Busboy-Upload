import path from 'path';

import uploadConfig from '../config/upload';

import * as StorageCloudProvider from '../providers/StorageProvider/implementations/StorageCloudProvider';
import * as StorageLocalProvider from '../providers/StorageProvider/implementations/DiskStorageProvider';
import * as CompressImage from '../providers/CompressImageProvider/implementation/ResizedProvider';
import * as UrlUploadsRepository from '../infra/database/mongodb/typeorm/repositories/UrlUploadsRepository';

export class CompressImageService {
  constructor(
    protected urlUploadsRepository = new UrlUploadsRepository.UrlUploadsRepository(),

    protected storageLocalProvider = new StorageLocalProvider.DiskStorageProvider(),

    protected storageCloudProvider = new StorageCloudProvider.StorageCloudProvider(),

    protected compressImage = new CompressImage.ResizedProvider(),
  ) {}

  public async execute(fileName: string): Promise<string> {
    const tempFolder = path.resolve(__dirname, '..', '..', 'tmp');
    const filePath = path.resolve(tempFolder, `${fileName}`);

    const [fileHashName, extension] = path.basename(filePath).split('.');

    const urlUploads = `https://${uploadConfig.config.aws.bucket}.s3.amazonaws.com/${fileName}`;

    const [https, , url] = urlUploads.split('/');
    const newUrlPath = `${https}//${url}`;

    const fileSizes = [128, 48, 32, 24, 16];

    const chooseStorageProvider =
      uploadConfig.driver === 's3'
        ? this.storageCloudProvider
        : this.storageLocalProvider;

    fileSizes.forEach(async fileSize => {
      const newFile = `${fileHashName}-${fileSize}.${extension}`;
      const fileParams = `${tempFolder}/${newFile}`;

      await this.compressImage.generateCompressImage({
        filePath,
        size: fileSize,
        newFile: fileParams,
      });

      if (uploadConfig.driver === 's3') {
        await this.urlUploadsRepository.create(
          `${newUrlPath}/${newFile}`,
          newFile,
        );
      }

      await chooseStorageProvider.saveFile(newFile);
    });

    if (uploadConfig.driver === 's3') {
      await this.urlUploadsRepository.create(urlUploads, fileHashName);
    }
    await chooseStorageProvider.saveFile(fileName);

    return fileName;
  }
}
