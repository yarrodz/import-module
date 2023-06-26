import { Router } from 'express';
import ImportProcessesController from './import-processes.controller';
declare class ImportProcessesRouter {
    router: Router;
    private importProcessesController;
    constructor(importProcessesController: ImportProcessesController);
    private initializeRoutes;
}
export default ImportProcessesRouter;
