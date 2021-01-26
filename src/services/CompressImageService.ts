import path from 'path';

import IStorageProvider from '../providers/StorageProvider/models/IStorageProvider';
import ICompressImage from '../providers/CompressImageProvider/models/ICompressImage';

class CompressImageService {
  constructor(
    private storageProvider: IStorageProvider,

    private compressImage: ICompressImage,
  ) {}

  public async execute(fileName: string): Promise<string> {
    const tempFolder = path.resolve(__dirname, '..', '..', 'tmp');
    const filePath = path.resolve(tempFolder, `${fileName}`);

    const [fileHashName, extension] = path.basename(filePath).split('.');

    const sizes = [128, 48, 32, 24, 16];

    sizes.forEach(async size => {
      const newFile = `${fileHashName}-${size}.${extension}`;

      const fileParams = `${tempFolder}/${newFile}`;

      await this.compressImage.generateCompressImage({
        filePath,
        size,
        newFile: fileParams,
      });

      await this.storageProvider.saveFile(newFile);
    });

    await this.storageProvider.saveFile(fileName);

    return fileName;
  }
}

export default CompressImageService;
