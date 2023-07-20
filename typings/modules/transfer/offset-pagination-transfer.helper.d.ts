import { Server as IO } from 'socket.io';
import TransferStepHelper from './transfer-step.helper';
import ImportProcessesRepository from '../import-processes/import-processes.repository';
import { IImportDocument } from '../imports/import.schema';
import IOffsetPaginationFunction from './interfaces/offset-pagination-function.interface';
declare class OffsetPaginationTransferHelper {
    private io;
    private transferStepHelper;
    private importProcessesRepository;
    constructor(io: IO, transferStepHelper: TransferStepHelper, importProcessesRepository: ImportProcessesRepository);
    offsetPaginationTransfer(impt: IImportDocument, processId: string, limit: number, offsetPaginationFunction: IOffsetPaginationFunction, ...offsetPaginationFunctionParams: any[]): Promise<void>;
}
export default OffsetPaginationTransferHelper;
