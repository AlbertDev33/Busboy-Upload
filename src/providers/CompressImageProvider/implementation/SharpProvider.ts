import sharp, { OutputInfo } from 'sharp';

import ICompressImage from '../models/ICompressImage';
import ICompressImageDTO from '../dtos/ICompressImageDTO';

export default class SharpProvider implements ICompressImage {
  public async generateCompressImage({
    filePath,
    size,
    newFile,
  }: ICompressImageDTO): Promise<OutputInfo> {
    const fileResized = await sharp(filePath)
      .clone()
      .resize({ width: size })
      .toFile(newFile);

    return fileResized;
  }
}
