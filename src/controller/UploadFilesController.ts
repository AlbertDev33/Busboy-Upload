import { IUploadProvider } from '@src/providers/uploadProvider/model/IUploadProvider';
import { IRequest, IResponse } from '../main/ExpressHttpRequest/HttpRequest';
import { IControllerModel } from '../main/ExpressHttpRequest/model/ControllerModel';

export class UploadFilesController implements IControllerModel {
  constructor(private uploadProvider: IUploadProvider) {}

  public async create(
    request: IRequest,
    response: IResponse,
  ): Promise<IResponse> {
    return this.uploadProvider.upload(request, response);
  }
}
