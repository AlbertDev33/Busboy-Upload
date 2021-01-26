import { OutputInfo } from 'sharp';

import ICompressImageDTO from '../dtos/ICompressImageDTO';

export default interface ICompressImage {
  generateCompressImage({
    filePath,
    size,
    newFile,
  }: ICompressImageDTO): Promise<OutputInfo>;
}
