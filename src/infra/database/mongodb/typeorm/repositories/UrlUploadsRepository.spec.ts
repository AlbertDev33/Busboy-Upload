import { getConnection } from 'typeorm';
import { openConnection, disconnect } from '../../../index';
import { UrlUploadsRepository } from './UrlUploadsRepository';

describe('Upload Mongo Repository', () => {
  beforeAll(async () => {
    await openConnection();
  });

  afterAll(async () => {
    const connection = getConnection('mongo');
    await connection.dropDatabase();
    await disconnect();
  });

  test('Should upload files', async () => {
    const sut = new UrlUploadsRepository();

    const url = 'any_url';
    const fileName = 'any_file_name';

    const upload = await sut.create(url, fileName);

    expect(upload).toBeTruthy();
    expect(upload.id).toBeTruthy();
    expect(upload.url).toBe('any_url');
    expect(upload.fileName).toBe('any_file_name');
  });
});
