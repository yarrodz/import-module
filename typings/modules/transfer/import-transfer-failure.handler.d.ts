import { Server as IO } from 'socket.io';
import ImportProcessesRepository from '../import-processes/import-processes.repository';
import { IImportDocument } from '../imports/import.schema';
import IImportTransferFunction from './interfaces/import-transfer-function.interface';
import { IImportProcessDocument } from '../import-processes/import-process.schema';
declare class ImportTransferFailureHandler {
    private io;
    private importProcessesRepository;
    private maxAttempts;
    private attemptDelayTime;
    constructor(io: IO, importProcessesRepository: ImportProcessesRepository, maxAttempts: number, attemptDelayTime: number);
    handle(error: Error, importTransferFunction: IImportTransferFunction, impt: IImportDocument, process: IImportProcessDocument): Promise<void>;
    private failImportTransfer;
    private retryImportTransfer;
}
export default ImportTransferFailureHandler;
