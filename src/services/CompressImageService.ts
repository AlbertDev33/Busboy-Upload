import path from 'path';

import uploadConfig from '../config/upload';

import IStorageProvider from '../providers/StorageProvider/models/IStorageProvider';
import * as CompressImage from '../providers/CompressImageProvider/implementation/ResizedProvider';
import IUrlUploadsRepository from '../database/repositories/IUrlUploadsRepository';

class CompressImageService {
  constructor(
    private urlUploadsRepository: IUrlUploadsRepository,

    private storageProvider: IStorageProvider,

    protected compressImage = new CompressImage.ResizedProvider(),
  ) {}

  public async execute(fileName: string): Promise<string> {
    const tempFolder = path.resolve(__dirname, '..', '..', 'tmp');
    const filePath = path.resolve(tempFolder, `${fileName}`);

    const [fileHashName, extension] = path.basename(filePath).split('.');

    const urlUploads = `https://${uploadConfig.config.aws.bucket}.s3.amazonaws.com/${fileName}`;

    const [https, , url] = urlUploads.split('/');
    const newUrlPath = `${https}//${url}`;

    const sizes = [128, 48, 32, 24, 16];

    sizes.forEach(async size => {
      const newFile = `${fileHashName}-${size}.${extension}`;
      const fileParams = `${tempFolder}/${newFile}`;

      await this.compressImage.generateCompressImage({
        filePath,
        size,
        newFile: fileParams,
      });

      await this.urlUploadsRepository.create(`${newUrlPath}/${newFile}`);

      await this.storageProvider.saveFile(newFile);
    });

    await this.urlUploadsRepository.create(urlUploads);
    await this.storageProvider.saveFile(fileName);

    return fileName;
  }
}

export default CompressImageService;
