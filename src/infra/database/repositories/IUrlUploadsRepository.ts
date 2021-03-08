import UrlUploads from '../mongodb/typeorm/schemas/UrlUploads';

export default interface IUrlUploadsRepository {
  create(url: string, fileName: string): Promise<UrlUploads>;
}
