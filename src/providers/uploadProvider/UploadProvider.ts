import { ICompressImageModel } from '@src/services/model/CompressImageModel';
import Busboy from 'busboy';
import fs from 'fs';

import { IRequest, IResponse } from '../../main/ExpressHttpRequest/HttpRequest';
import { IFilePathProvider } from '../FilePathProvider/model/IFilePathProvider';
import { IHashFileNameModel } from '../RandomFileProvider/model/HashFileNameModel';

import uploadConfig from '../../config/upload';
import { IUploadProvider } from './model/IUploadProvider';

export class UploadProvider implements IUploadProvider {
  constructor(
    private compressImageService: ICompressImageModel,

    private hashFileName: IHashFileNameModel,

    private filePathProvider: IFilePathProvider,
  ) {}

  async upload(request: IRequest, response: IResponse): Promise<IResponse> {
    const busboy = new Busboy({ headers: request.headers });

    busboy.on('file', (fieldName, file, filename) => {
      const fileHash = this.hashFileName.hash(10);
      const fileName = `${fileHash}-${filename}`;

      const tmpFolder = this.filePathProvider.resolve(
        uploadConfig.tmpFolder,
        fileName,
      );

      const newFile = file.pipe(fs.createWriteStream(tmpFolder));

      newFile.on('close', () => {
        this.compressImageService.execute(fileName);
      });
    });

    busboy.on('finish', () => {
      response.writeHead(201, { Connection: 'close' });
      response.end('Upload realizado com sucesso!');
    });

    request.pipe(busboy);

    return response.status(204);
  }
}
