import { Server as IO } from 'socket.io';
import TransferStepHelper from './transfer-step.helper';
import ImportProcessesRepository from '../import-processes/import-processes.repository';
import { IImportDocument } from '../imports/import.schema';
import ICursorPaginationFunction from './interfaces/cursor-pagination-function.interface';
declare class CursorPaginationTransferHelper {
    private io;
    private transferStepHelper;
    private importProcessesRepository;
    constructor(io: IO, transferStepHelper: TransferStepHelper, importProcessesRepository: ImportProcessesRepository);
    cursorPaginationTransfer(impt: IImportDocument, processId: string, limit: number, cursorPaginationFunction: ICursorPaginationFunction, ...cursorPaginationFunctionParams: any[]): Promise<void>;
}
export default CursorPaginationTransferHelper;
