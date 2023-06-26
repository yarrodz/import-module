import { Router } from 'express';
import ImportsController from './imports.controller';
declare class ImportsRouter {
    router: Router;
    private importsController;
    constructor(importsController: ImportsController);
    private initializeRoutes;
}
export default ImportsRouter;
