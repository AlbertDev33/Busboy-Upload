import Busboy from 'busboy';
import path from 'path';
import fs from 'fs';

import { IRequest, IResponse } from '../shared/ExpressHttpRequest/HttpRequest';
import { CompressImageService } from '../services/CompressImageService';
import { HashFileProvider } from '../providers/RandomFileProvider/HashFileProvider';

import uploadConfig from '../config/upload';

export default class UploadBusboyController {
  public async create(
    request: IRequest,
    response: IResponse,
  ): Promise<IResponse> {
    const busboy = new Busboy({ headers: request.headers });

    busboy.on('file', (fieldName, file, filename) => {
      const hashFileProvider = new HashFileProvider();

      const fileHash = hashFileProvider.hash(10);
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
