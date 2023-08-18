import { Request } from 'express';
import SqlTransferService from '../sql/sql-transfer.service';
import ApiTransferService from '../api/api-transfer.service';
import ResponseHandler from '../../utils/response-handler/response-handler';
import TransfersRepository from './transfers.repository';
import ProcessesRepository from '../processes/process.repository';
declare class TransfersService {
    private sqlTransferService;
    private apiTransferService;
    private transfersRepository;
    private processesRepository;
    constructor(sqlTransferService: SqlTransferService, apiTransferService: ApiTransferService, transfersRepository: TransfersRepository, processesRepository: ProcessesRepository);
    getAll(select: any, sortings: any): Promise<ResponseHandler>;
    delete(id: number): Promise<ResponseHandler>;
    pause(id: number): Promise<ResponseHandler>;
    reload(req: Request, id: number): Promise<ResponseHandler>;
    retry(req: Request, id: number): Promise<ResponseHandler>;
}
export default TransfersService;
