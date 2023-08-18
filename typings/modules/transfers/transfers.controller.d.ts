import { Request, Response } from 'express';
import TransfersService from './transfers.service';
export declare class TransfersController {
    private transfersService;
    constructor(transfersService: TransfersService);
    getAll: (req: Request, res: Response) => Promise<void>;
    delete: (req: Request, res: Response) => Promise<void>;
    pause: (req: Request, res: Response) => Promise<void>;
    reload: (req: Request, res: Response) => Promise<void>;
    retry: (req: Request, res: Response) => Promise<void>;
}
export default TransfersController;
