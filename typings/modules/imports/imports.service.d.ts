import { Request } from 'express';
import ImportsRepository from './imports.repository';
import ImportProcessesRepository from '../import-processes/import-processes.repository';
import SqlImportService from '../sql/sql-import.service';
import ApiImportService from '../api/api-import.service';
import ResponseHandler from '../../utils/response-handler/response-handler';
import { IImport } from './import.schema';
import { IField } from './sub-schemas/field.schema';
declare class ImportsService {
    private importsRepository;
    private importProcessesRepository;
    private sqlImportService;
    private apiImportService;
    constructor(importsRepository: ImportsRepository, importProcessesRepository: ImportProcessesRepository, sqlImportService: SqlImportService, apiImportService: ApiImportService);
    findAll(unit: string): Promise<ResponseHandler>;
    create(req: Request, createImportInput: IImport): Promise<ResponseHandler>;
    update(req: Request, id: string, updateImportInput: IImport): Promise<ResponseHandler>;
    delete(id: string): Promise<ResponseHandler>;
    connect(req: Request, id: string): Promise<ResponseHandler>;
    setFields(id: string, fieldInputs: IField[]): Promise<ResponseHandler>;
    start(req: Request, id: string): Promise<ResponseHandler>;
}
export default ImportsService;
