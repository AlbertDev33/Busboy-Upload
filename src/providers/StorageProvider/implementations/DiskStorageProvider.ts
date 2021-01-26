import path from 'path';
import fs, { createReadStream } from 'fs';

import IStorageProvider from '../models/IStorageProvider';

import uploadConfig from '../../../config/upload';

class DiskStorageProvider implements IStorageProvider {
  public async saveFile(file: string): Promise<string> {
    const uploadPath = path.resolve(uploadConfig.tmpFolder, file);
    const destPath = path.resolve(uploadConfig.uploadFolder, file);

    const readStream = createReadStream(uploadPath);

    const localFile = readStream.pipe(fs.createWriteStream(destPath));

    localFile.on('close', () => {
      fs.promises.unlink(uploadPath);
    });

    return file;
  }
}

export default DiskStorageProvider;
