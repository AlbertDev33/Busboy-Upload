import { Request, Response } from 'express';
import Busboy from 'busboy';
import path from 'path';
import crypto from 'crypto';
import fs from 'fs';

import { CompressImageService } from '../services/CompressImageService';

import uploadConfig from '../config/upload';

export default class UploadBusboyController {
  public async create(request: Request, response: Response): Promise<Response> {
    const busboy = new Busboy({ headers: request.headers });

    busboy.on('file', (fieldName, file, filename) => {
      const fileHash = crypto.randomBytes(10).toString('hex');
      const fileName = `${fileHash}-${filename}`;

      const tmpFolder = path.resolve(uploadConfig.tmpFolder, fileName);

      const newFile = file.pipe(fs.createWriteStream(tmpFolder));

      newFile.on('close', () => {
        const compressImageService = new CompressImageService();

        compressImageService.execute(fileName);
      });
    });

    busboy.on('finish', () => {
      response.writeHead(200, { Connection: 'close' });
      response.end('Upload realizado com sucesso!');
    });

    request.pipe(busboy);

    return response.status(204);
  }
}
