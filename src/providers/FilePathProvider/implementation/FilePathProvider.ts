import path from 'path';

import { IFilePathProvider } from '../model/IFilePathProvider';

export class FilePathProvider implements IFilePathProvider {
  public resolve(...pathSegments: string[]): string {
    const filePath = path.resolve(...pathSegments);

    return filePath;
  }

  public basename(filePath: string, ext?: string | undefined): string {
    return path.basename(filePath, ext);
  }
}
