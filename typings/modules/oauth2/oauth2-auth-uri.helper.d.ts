import { Request } from 'express';
import { IImportDocument } from '../imports/import.schema';
import IOAuth2CallbackContext from '../imports/interfaces/import-context.interface';
declare class OAuth2AuthUriHelper {
    private oAuth2RedirectUri;
    constructor(oAuth2RedirectUri: string);
    createUri: (req: Request, impt: IImportDocument, context: IOAuth2CallbackContext) => Promise<string>;
    private createAuthUriParams;
    private createAuthCallbackParams;
    private setCodeVerifier;
    private queryStringFromObject;
}
export default OAuth2AuthUriHelper;
