import sharp, { Sharp, OutputInfo } from 'sharp';
import { ICompressImageProvider } from '../models/ICompressImageProvider';
import ICompressImageDTO from '../dtos/ICompressImageDTO';

export interface IOutputConfig extends OutputInfo {}

export interface IResponse extends Sharp {}

export class ResizedProvider implements ICompressImageProvider {
  private sharpResponse: IResponse;

  private sharpReturn: IOutputConfig;

  constructor(private fileResized = sharp) {}

  public async generateCompressImage({
    filePath,
    size,
    newFile,
  }: ICompressImageDTO): Promise<IOutputConfig> {
    this.sharpResponse = this.fileResized(filePath);

    this.sharpReturn = await this.sharpResponse
      .clone()
      .resize({ width: size })
      .toFile(newFile);

    return this.sharpReturn;
  }
}
