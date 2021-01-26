import path from 'path';

interface IUploadConfig {
  driver: 's3' | 'disk';

  tmpFolder: string;
  uploadFolder: string;

  config: {
    aws: {
      bucket: string;
    };
  };
}

const tmpFolder = path.resolve(__dirname, '..', '..', 'tmp');
const uploadFolder = path.resolve(tmpFolder, 'uploads');

export default {
  driver: process.env.STORAGE_DRIVER,

  tmpFolder,
  uploadFolder,

  config: {
    aws: {
      bucket: 'app-ticket',
    },
  },
} as IUploadConfig;
