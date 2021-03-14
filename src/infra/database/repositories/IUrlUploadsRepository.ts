import UrlUploads from '../mongodb/typeorm/schemas/UrlUploads';

export interface IUrlUploadsRepository {
  create(url: string, fileName: string): Promise<UrlUploads>;
}
