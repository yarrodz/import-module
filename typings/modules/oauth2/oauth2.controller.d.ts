import { Request, Response } from 'express';
import OAuth2Service from './oauth2.service';
declare class OAuth2Controller {
    private oAuth2Service;
    constructor(oAuthService: OAuth2Service);
    oAuth2Callback: (req: Request, res: Response) => Promise<void>;
}
export default OAuth2Controller;
