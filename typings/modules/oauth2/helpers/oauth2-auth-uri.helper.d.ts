import { Request } from 'express';
import ApiConnection from '../../api/interfaces/api-connection.interface';
import Context from '../../imports/interfaces/context.interface';
declare class OAuth2AuthUriHelper {
    private oAuth2RedirectUri;
    constructor(oAuth2RedirectUri: string);
    createUri: (req: Request, connection: ApiConnection, context: Context) => Promise<string>;
    private createAuthUriParams;
    private createAuthCallbackParams;
    private setCodeVerifier;
    private queryStringFromObject;
}
export default OAuth2AuthUriHelper;
