import aws, { S3 } from 'aws-sdk';
import path from 'path';
import fs, { createReadStream } from 'fs';
import mime from 'mime';

import IStorageProvider from '../models/IStorageProvider';
import uploadConfig from '../../../config/upload';

export class StorageCloudProvider implements IStorageProvider {
  constructor(
    private client = new aws.S3({
      region: 'us-east-1',
    }),
  ) {}

  public async saveFile(file: string): Promise<string> {
    const uploadPath = path.resolve(uploadConfig.tmpFolder, file);

    const contentType = mime.getType(uploadPath);

    if (!contentType) {
      throw new Error('File not found');
    }

    const contentFile = createReadStream(uploadPath);

    await this.client
      .putObject({
        Bucket: uploadConfig.config.aws.bucket,
        Key: file,
        ContentType: contentType,
        ACL: 'public-read',
        Body: contentFile,
        ContentDisposition: `inline; filename-${file}`,
      })
      .promise();

    await fs.promises.unlink(uploadPath);

    return file;
  }
}
