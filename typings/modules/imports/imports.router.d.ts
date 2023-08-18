import { Router } from 'express';
import ImportsController from './imports.controller';
declare class ImportsRouter {
    router: Router;
    private importsController;
    constructor(ImportsController: ImportsController);
    private initializeRoutes;
}
export default ImportsRouter;
