import ImportProcessesRepository from './import-processes.repository';
import ImportsRepository from '../imports/imports.repository';
import ResponseHandler from '../../utils/response-handler/response-handler';
import TransferService from '../transfer/transfer.service';
declare class ImportProcessesService {
    private importProcessesRepository;
    private importsRepository;
    private transferService;
    constructor(importProcessesRepository: ImportProcessesRepository, importsRepository: ImportsRepository, transferService: TransferService);
    findAll(unit: string): Promise<ResponseHandler>;
    delete(id: string): Promise<ResponseHandler>;
    pause(id: string): Promise<ResponseHandler>;
    reload(id: string): Promise<ResponseHandler>;
    retry(id: string): Promise<ResponseHandler>;
}
export default ImportProcessesService;
