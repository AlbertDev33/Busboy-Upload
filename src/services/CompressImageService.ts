import uploadConfig from '../config/upload';

import { ILocalStorageProvider } from '../providers/StorageProvider/models/ILocalStorageProvider';
import { ICloudStorageProvider } from '../providers/StorageProvider/models/ICloudStorageProvider';
import { ICompressImageProvider } from '../providers/CompressImageProvider/models/ICompressImageProvider';
import { IUrlUploadsRepository } from '../infra/database/repositories/IUrlUploadsRepository';
import { IFilePathProvider } from '../providers/FilePathProvider/model/IFilePathProvider';

import { ICompressImageModel } from './model/CompressImageModel';

export class CompressImageService implements ICompressImageModel {
  constructor(
    private urlUploadsRepository: IUrlUploadsRepository,

    private localStorageProvider: ILocalStorageProvider,

    private cloudStorageProvider: ICloudStorageProvider,

    private compressImageProvider: ICompressImageProvider,

    private filePathProvider: IFilePathProvider,
  ) {}

  public async execute(fileName: string): Promise<string> {
    const tempFolder = this.filePathProvider.resolve(
      __dirname,
      '..',
      '..',
      'tmp',
    );
    const filePath = this.filePathProvider.resolve(tempFolder, `${fileName}`);

    const [fileHashName, extension] = this.filePathProvider
      .basename(filePath)
      .split('.');

    const urlUploads = `https://${uploadConfig.config.aws.bucket}.s3.amazonaws.com/${fileName}`;

    const [https, , url] = urlUploads.split('/');
    const newUrlPath = `${https}//${url}`;

    const fileSizes = [128, 48, 32, 24, 16];

    const chooseStorageProvider =
      uploadConfig.driver === 's3'
        ? this.cloudStorageProvider
        : this.localStorageProvider;

    fileSizes.forEach(async fileSize => {
      const newFile = `${fileHashName}-${fileSize}.${extension}`;
      const fileParams = `${tempFolder}/${newFile}`;

      await this.compressImageProvider.generateCompressImage({
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
