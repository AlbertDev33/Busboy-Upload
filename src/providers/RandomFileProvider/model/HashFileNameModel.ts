export interface IHashFileNameModel {
  hash(salt: number): string;
}
