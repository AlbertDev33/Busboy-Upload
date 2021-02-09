import { MongoRepository, getMongoRepository } from 'typeorm';

import IUrlUploadsRepository from '../../../repositories/IUrlUploadsRepository';

import UrlUploads from '../schemas/UrlUploads';

export class UrlUploadsRepository implements IUrlUploadsRepository {
  private ormRepository: MongoRepository<UrlUploads>;

  constructor() {
    this.ormRepository = getMongoRepository(UrlUploads, 'mongo');
  }

  public async create(url: string): Promise<UrlUploads> {
    const urlUploads = this.ormRepository.create({
      url,
    });

    await this.ormRepository.save(urlUploads);

    return urlUploads;
  }
}
