import { Request, Response } from 'express';
import ImportsService from './imports.service';
declare class ImportsController {
    private importsService;
    constructor(importsService: ImportsService);
    getAll: (req: Request, res: Response) => Promise<void>;
    get: (req: Request, res: Response) => Promise<void>;
    create: (req: Request, res: Response) => Promise<void>;
    update: (req: Request, res: Response) => Promise<void>;
    delete: (req: Request, res: Response) => Promise<void>;
    getColumns: (req: Request, res: Response) => Promise<void>;
    checkIdColumnUniqueness: (req: Request, res: Response) => Promise<void>;
    import: (req: Request, res: Response) => Promise<void>;
}
export default ImportsController;
