import { Response, Request } from 'express';

export interface IRequest extends Request {}

export interface IResponse extends Response {}

export class HttpRequest {
  static async create(
    request: IRequest,
    response: IResponse,
  ): Promise<IRequest | IResponse> {
    return request && response;
  }
}
