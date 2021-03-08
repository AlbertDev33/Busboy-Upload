import Busboy from 'busboy';
import path from 'path';
import fs from 'fs';

import { IRequest, IResponse } from '../main/ExpressHttpRequest/HttpRequest';
import { IControllerModel } from '../main/ExpressHttpRequest/model/ControllerModel';
import { ICompressImageModel } from '../services/model/CompressImageModel';
import { IHashFileNameModel } from '../providers/RandomFileProvider/model/HashFileNameModel';

import uploadConfig from '../config/upload';

export class UploadBusboyController implements IControllerModel {
  constructor(
    private compressImageService: ICompressImageModel,

    private hashFileName: IHashFileNameModel,
  ) {}

  public async create(
    request: IRequest,
    response: IResponse,
  ): Promise<IResponse> {
    const busboy = new Busboy({ headers: request.headers });

    busboy.on('file', (fieldName, file, filename) => {
      const fileHash = this.hashFileName.hash(10);
      const fileName = `${fileHash}-${filename}`;

      const tmpFolder = path.resolve(uploadConfig.tmpFolder, fileName);

      const newFile = file.pipe(fs.createWriteStream(tmpFolder));

      newFile.on('close', () => {
        this.compressImageService.execute(fileName);
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
