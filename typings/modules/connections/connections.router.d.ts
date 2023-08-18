import { Router } from 'express';
import ConnectionsController from './connections.controller';
declare class ConnectionsRouter {
    router: Router;
    private connectionsController;
    constructor(connectionsController: ConnectionsController);
    private initializeRoutes;
}
export default ConnectionsRouter;
