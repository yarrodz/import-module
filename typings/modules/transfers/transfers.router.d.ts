import { Router } from 'express';
import TransfersController from './transfers.controller';
declare class TransfersRouter {
    router: Router;
    private transfersController;
    constructor(transfersController: TransfersController);
    private initializeRoutes;
}
export default TransfersRouter;
