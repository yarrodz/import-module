import { Server as IO } from 'socket.io';
import { IImportDocument } from '../imports/import.schema';
import { IImportProcessDocument } from '../import-processes/import-process.schema';
import ImportProcessesRepository from '../import-processes/import-processes.repository';
import TransferSQLService from './transfers/transfer-sql.service';
declare class TransferService {
    private io;
    private importProcessesRepository;
    private transferSQLService;
    private maxAttempts;
    private attemptDelayTime;
    private limit;
    constructor(io: IO, importProcessesRepository: ImportProcessesRepository, transferSQLService: TransferSQLService, maxAttempts: number, attemptDelayTime: number, limit: number);
    transfer(impt: IImportDocument, process: IImportProcessDocument): Promise<void>;
    private run;
    private handleTranserFailure;
    private failTransferProcess;
    private retryTransferProcess;
    private delayAttempt;
}
export default TransferService;
