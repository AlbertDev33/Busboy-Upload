/* eslint-disable @typescript-eslint/no-empty-interface */

import sharp, { Sharp, OutputInfo } from 'sharp';
import ICompressImage from '../models/ICompressImage';
import ICompressImageDTO from '../dtos/ICompressImageDTO';

export interface IOutputConfig extends OutputInfo {}

export interface IResponse extends Sharp {}

export class ResizedProvider implements ICompressImage {
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
