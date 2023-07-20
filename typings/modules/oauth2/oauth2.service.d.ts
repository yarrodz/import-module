import { Request } from 'express';
import ResponseHandler from '../../utils/response-handler/response-handler';
import ImportsRepository from '../imports/imports.repository';
declare class OAuth2Service {
    private importsRepository;
    private oAuth2RedirectUri;
    private clientUri;
    constructor(importsRepository: ImportsRepository, oAuth2RedirectUri: string, clientUri: string);
    oAuth2Callback: (req: Request) => Promise<ResponseHandler>;
    private createCallbackBody;
    private createSuccessRedirectUri;
    private createErrorRedirectUri;
}
export default OAuth2Service;
