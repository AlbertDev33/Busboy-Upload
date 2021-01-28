import path from 'path';
import fs, { createReadStream } from 'fs';

import IStorageProvider from '../models/IStorageProvider';

import uploadConfig from '../../../config/upload';

class DiskStorageProvider implements IStorageProvider {
  public async saveFile(file: string): Promise<string> {
    const tmpFolder = path.resolve(uploadConfig.tmpFolder, file);
    const uploadFolder = path.resolve(uploadConfig.uploadFolder, file);

    const readStream = createReadStream(tmpFolder);

    const localFile = readStream.pipe(fs.createWriteStream(uploadFolder));

    localFile.on('close', () => {
      fs.promises.unlink(tmpFolder);
    });

    return file;
  }
}

export default DiskStorageProvider;
