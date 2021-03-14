import ICompressImageDTO from '../dtos/ICompressImageDTO';

export interface ISharpConfig {
  size: number;
  width: number;
}

export interface ICompressImageProvider {
  generateCompressImage({
    filePath,
    size,
    newFile,
  }: ICompressImageDTO): Promise<ISharpConfig>;
}
