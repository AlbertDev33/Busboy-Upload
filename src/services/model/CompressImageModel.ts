export interface ICompressImageModel {
  execute(fileName: string): Promise<string>;
}
