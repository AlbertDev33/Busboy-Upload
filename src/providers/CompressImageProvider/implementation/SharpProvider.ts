import sharp from 'sharp';

import ICompressImage from '../models/ICompressImage';
import ICompressImageDTO from '../dtos/ICompressImageDTO';

export interface ISharpConfig {
  size: number;
  width: number;
}

export default class SharpProvider implements ICompressImage {
  constructor(private fileResized = sharp) {}

  public async generateCompressImage({
    filePath,
    size,
    newFile,
  }: ICompressImageDTO): Promise<ISharpConfig> {
    return this.fileResized(filePath)
      .clone()
      .resize({ width: size })
      .toFile(newFile);
  }
}
