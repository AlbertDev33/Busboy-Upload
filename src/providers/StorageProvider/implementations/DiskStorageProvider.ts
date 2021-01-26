import path from 'path';
import fs from 'fs';

import IStorageProvider from '../models/IStorageProvider';

import uploadConfig from '../../../config/upload';

class DiskStorageProvider implements IStorageProvider {
  public async saveFile(file: string): Promise<string> {
    await fs.promises.rename(
      path.resolve(uploadConfig.tmpFolder, file),
      path.resolve(uploadConfig.uploadFolder, file),
    );

    return file;
  }
}

export default DiskStorageProvider;
