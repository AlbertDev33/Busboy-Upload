import ICompressImageDTO from '../dtos/ICompressImageDTO';

export interface ISharpConfig {
  size: number;
  width: number;
}

export default interface ICompressImage {
  generateCompressImage({
    filePath,
    size,
    newFile,
  }: ICompressImageDTO): Promise<ISharpConfig>;
}
