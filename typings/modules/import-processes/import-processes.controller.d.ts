import { Request, Response } from 'express';
import ImportsProcessesService from './import-processes.service';
export declare class ImportProcessesController {
    private importProcessesService;
    constructor(importsService: ImportsProcessesService);
    findAll: (req: Request, res: Response) => Promise<void>;
    delete: (req: Request, res: Response) => Promise<void>;
    pause: (req: Request, res: Response) => Promise<void>;
    reload: (req: Request, res: Response) => Promise<void>;
    retry: (req: Request, res: Response) => Promise<void>;
}
export default ImportProcessesController;
