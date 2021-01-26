import { Request, Response } from 'express';
import Busboy from 'busboy';
import path from 'path';
import crypto from 'crypto';
import fs from 'fs';

import CompressImageService from '../services/CompressImageService';
import S3StorageProvider from '../providers/StorageProvider/implementations/S3StorageProvider';
import DiskStorageProvider from '../providers/StorageProvider/implementations/DiskStorageProvider';
import SharpProvider from '../providers/CompressImageProvider/implementation/SharpProvider';
import uploadConfig from '../config/upload';

export default class UploadBusboy {
  public async create(request: Request, response: Response): Promise<void> {
    const busboy = new Busboy({ headers: request.headers });

    busboy.on('file', (fieldName, file, filename) => {
      const s3StorageProvider = new S3StorageProvider();
      const diskStorageProvider = new DiskStorageProvider();
      const sharpProvider = new SharpProvider();

      const fileHash = crypto.randomBytes(10).toString('hex');
      const fileName = `${fileHash}-${filename}`;

      const tmpFolder = path.resolve(
        __dirname,
        '..',
        '..',
        'tmp',
        `${fileName}`,
      );
      const newFile = file.pipe(fs.createWriteStream(tmpFolder));

      newFile.on('close', () => {
        const chooseStorageProvider =
          uploadConfig.driver === 's3'
            ? s3StorageProvider
            : diskStorageProvider;

        const compressImageService = new CompressImageService(
          chooseStorageProvider,
          sharpProvider,
        );

        compressImageService.execute(fileName);
      });
    });

    busboy.on('finish', () => {
      response.writeHead(200, { Connection: 'close' });
      response.end('Upload realizado com sucesso!');
    });

    request.pipe(busboy);
  }
}
