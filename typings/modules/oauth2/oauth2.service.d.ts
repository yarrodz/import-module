import { Request } from 'express';
import ConnectionsRepository from '../connections/connections.repository';
import ResponseHandler from '../../utils/response-handler/response-handler';
declare class OAuth2Service {
    private oAuth2RedirectUri;
    private clientUri;
    private connectionsRepository;
    constructor(oAuth2RedirectUri: string, clientUri: string, connectionsRepository: ConnectionsRepository);
    oAuth2Callback: (req: Request) => Promise<ResponseHandler>;
    private createCallbackBody;
    private createSuccessRedirectUri;
    private createErrorRedirectUri;
}
export default OAuth2Service;
