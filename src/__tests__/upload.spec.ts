import request from 'supertest';
import { getConnection } from 'typeorm';

import app from '../main/config/app';
import { openConnection, disconnect } from '../infra/database';

describe('Files Upload', () => {
  beforeAll(async () => {
    await openConnection();
  });

  afterAll(async () => {
    const connection = getConnection('mongo');
    await connection.dropDatabase();
    await disconnect();
  });

  // test('Should be able to hash fileName', async () => {
  //   const response = await request(app).post('/files').send('any_file_name');
  // });

  test('Should be able create a new url and fileName in database', async () => {
    const response = await request(app).post('/files').send('any_file_name');

    const { text } = response;

    expect(response.status).toBe(201);
    expect(text).toEqual('Upload realizado com sucesso!');
  });
});
