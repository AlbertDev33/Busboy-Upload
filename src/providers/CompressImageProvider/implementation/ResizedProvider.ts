import sharp, { Sharp, OutputInfo } from 'sharp';

import ICompressImage from '../models/ICompressImage';
import ICompressImageDTO from '../dtos/ICompressImageDTO';

export type ISharpConfig = OutputInfo;

export type ISharpResponse = Sharp;

export class ResizedProvider implements ICompressImage {
  constructor(private fileResized = sharp) {}

  public async generateCompressImage({
    filePath,
    size,
    newFile,
  }: ICompressImageDTO): Promise<ISharpConfig> {
    const sharpResponse = this.fileResized(filePath);

    const sharpReturn = await sharpResponse
      .clone()
      .resize({ width: size })
      .toFile(newFile);

    return sharpReturn;
  }
}
