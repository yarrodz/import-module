import { Request } from 'express';
import ProcessesRepository from '../processes/process.repository';
import SqlImportService from '../sql/sql-import.service';
import ApiImportService from '../api/api-import.service';
import ResponseHandler from '../../utils/response-handler/response-handler';
import TransfersRepository from '../transfers/transfers.repository';
declare class ImportsService {
    private sqlImportService;
    private apiImportService;
    private processesRepository;
    private transfersRepository;
    constructor(sqlImportService: SqlImportService, apiImportService: ApiImportService, processesRepository: ProcessesRepository, transfersRepository: TransfersRepository);
    getAll(select: any, sortings: any): Promise<ResponseHandler>;
    get(id: number): Promise<ResponseHandler>;
    create(input: any): Promise<ResponseHandler>;
    update(input: any): Promise<ResponseHandler>;
    delete(id: number): Promise<ResponseHandler>;
    getColumns(req: Request, id: number): Promise<ResponseHandler>;
    checkIdColumnUniqueness(req: Request, id: number): Promise<ResponseHandler>;
    import(req: Request, id: number): Promise<ResponseHandler>;
}
export default ImportsService;
