import UrlUploads from '../mongodb/typeorm/schemas/UrlUploads';

export default interface IUrlUploadsRepository {
  create(url: string): Promise<UrlUploads>;
}
