import { Request, Response } from 'express';
import ConnectionsService from './connections.service';
declare class ConnectionsController {
    private connectionsService;
    constructor(connectionsService: ConnectionsService);
    getAll: (req: Request, res: Response) => Promise<void>;
    get: (req: Request, res: Response) => Promise<void>;
    create: (req: Request, res: Response) => Promise<void>;
    update: (req: Request, res: Response) => Promise<void>;
    delete: (req: Request, res: Response) => Promise<void>;
}
export default ConnectionsController;
