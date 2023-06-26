import { Request, Response } from 'express';
import ImportsService from './imports.service';
declare class ImportsController {
    private importsService;
    constructor(importsService: ImportsService);
    findAll: (req: Request, res: Response) => Promise<void>;
    create: (req: Request, res: Response) => Promise<void>;
    update: (req: Request, res: Response) => Promise<void>;
    connect: (req: Request, res: Response) => Promise<void>;
    setFields: (req: Request, res: Response) => Promise<void>;
    start: (req: Request, res: Response) => Promise<void>;
    delete: (req: Request, res: Response) => Promise<void>;
}
export default ImportsController;
