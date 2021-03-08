import { openConnection } from '../infra/database';

openConnection()
  .then(async () => {
    const app = (await import('./config/app')).default;

    app.listen(3333, () => {
      console.log('Executando na porta 3333');
    });
  })
  .catch(console.error);
