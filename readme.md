# O que essa API faz?

Essa API implementa uma solução de upload robusta, utilizando o Busboy e redimensionamento de imagens, utilizando o Sharp, outra biblioteca bastante robusta para esse fim.

Há uma configuração para upload dos arquivos de imagem para o serviço de storage S3 da AWS. Toda a url enviada para esse serviço fica armazenada dentro do banco não relacional MonngoDB (https://www.mongodb.com/).

## Como executar o projeto

- Clone o projeto;
- Execute o comando yarn ou npm install (esse projeto utilizou yarn);

- Para verificar se está tudo ok, execute o comando yarn dev:server
(ou npm run dev:server);

- No arquivo .env.example há os nomes das variáveis ambiente que foram utilizadas
nesse projeto. As chaves de acesso à conta da AWS serão enviadas à parte, por
questões de segurança;

- Há dois tipos de drivers que podem ser utilizados nas variáveis
ambiente: "s3" ou "disk". Ao selecionar disk os arquivos serão salvos no disco
local. Ao selecionar s3, se as chaves de acesso estiverem configuradas corretamente,
os arquivos irão para o bucket "desafior2t".

- Utilizando uma ferramenta cliente http, como o Insomnia, por exemplo, crie uma
rota do tipo POST para o endereço http://localhost:3333/files;

- O corpo da solicitação deve ser do tipo Multipart Form.

- O nome do campo deve ser "file", conforme configuração utilizada no Multer;

- Será necessário ter uma versão do Mongodb instalada na máquina que for rodar
esse projeto. Nesse projeto foi utilizada uma imagem do Mongo rodando no Docker.

## Principais ferramentas utilizadas no projeto

- Para configuração de todo o serviço http foi utilizado o framework Express;

- Para realizar o upload local dos arquivos, foi utilizado a lib Busboy;

- Para realizar o redimensionamento das imagens, foi utilizada o lib Sharp;

- Foi fundamental utilizar a SDK da AWS para realizar o upload para o S3. A lib
instalada foi aws-sdk;

- Para configurar o contentType dos arquivos e possibilitar abri-los através do
link no s3, foi utilizada a lib mime;

- A lib dot-env foi utilizada para que a aplicação não tivesse problemas para ler
as variáveis ambiente no arquivo .env;

- Esse projeto utilizou como padrão para seu desenvolvimento o Typescript. As demais
bibliotecas utilizadas no projeto foram basicamente para padronização do código.

- Como banco de dados para o projeto, foi utilizado o Mongodb, banco não relacional.
Para ter acesso à conexão com o banco foi instalado o plugin mongodb.

- Para gerenciar a conexão com o banco de dados foi utilizado o ORM TypeORM. A lib
instalado foi a typeorm.
