import { IRequest, IResponse } from '@src/main/ExpressHttpRequest/HttpRequest';

export interface IUploadProvider {
  upload(request: IRequest, response: IResponse): Promise<IResponse>;
}
