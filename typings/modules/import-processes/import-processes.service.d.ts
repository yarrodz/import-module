import { Request } from 'express';
import ImportProcessesRepository from './import-processes.repository';
import ImportsRepository from '../imports/imports.repository';
import SqlImportService from '../sql/sql-import.service';
import ApiImportService from '../api/api-import.service';
import ResponseHandler from '../../utils/response-handler/response-handler';
declare class ImportProcessesService {
    private importProcessesRepository;
    private importsRepository;
    private sqlImportService;
    private apiImportService;
    constructor(importProcessesRepository: ImportProcessesRepository, importsRepository: ImportsRepository, sqlImportService: SqlImportService, apiImportService: ApiImportService);
    findAll(unit: string): Promise<ResponseHandler>;
    delete(id: string): Promise<ResponseHandler>;
    pause(id: string): Promise<ResponseHandler>;
    reload(req: Request, id: string): Promise<ResponseHandler>;
    retry(req: Request, id: string): Promise<ResponseHandler>;
}
export default ImportProcessesService;
