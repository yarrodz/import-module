import { Router } from 'express';
import OAuthController from './oauth2.controller';
declare class OAuth2Router {
    router: Router;
    private oAuthController;
    constructor(oAuthController: OAuthController);
    private initializeRoutes;
}
export default OAuth2Router;
