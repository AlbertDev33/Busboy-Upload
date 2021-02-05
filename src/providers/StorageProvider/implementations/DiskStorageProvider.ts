import path from 'path';
import fs from 'fs';
import { pipeline } from 'stream';
import { promisify } from 'util';

import IStorageProvider from '../models/IStorageProvider';

import uploadConfig from '../../../config/upload';

class DiskStorageProvider implements IStorageProvider {
  public async saveFile(file: string): Promise<string> {
    const tmpFolder = path.resolve(uploadConfig.tmpFolder, file);
    const uploadFolder = path.resolve(uploadConfig.uploadFolder, file);

    const promisedPipeline = promisify(pipeline);

    const readStream = async () => {
      await promisedPipeline(
        fs.createReadStream(tmpFolder),
        fs.createWriteStream(uploadFolder),
      );
      await fs.promises.unlink(tmpFolder);
    };

    readStream().catch(console.error);

    // const readStream = pipeline(
    //   fs.createReadStream(tmpFolder),
    //   fs.createWriteStream(uploadFolder),
    //   err => {
    //     console.log(err);
    //   },
    // );

    // const localFile = readStream.pipe(fs.createWriteStream(uploadFolder));

    // readStream.on('close', () => {
    //   fs.promises.unlink(tmpFolder);
    // });

    return file;
  }
}

export default DiskStorageProvider;
