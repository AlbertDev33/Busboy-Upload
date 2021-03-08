import crypto from 'crypto';

export class HashFileProvider {
  public hash(salt: number): string {
    const random = crypto.randomBytes(salt).toString('hex');

    return random;
  }
}
