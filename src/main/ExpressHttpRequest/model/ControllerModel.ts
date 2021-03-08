import { IRequest, IResponse } from '../HttpRequest';

export interface IControllerModel {
  create(request: IRequest, response: IResponse): Promise<IResponse>;
}
