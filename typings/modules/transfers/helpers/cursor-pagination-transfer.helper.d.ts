import { Server as IO } from 'socket.io';
import ImportStepHelper from './import-step.helper';
import TransfersRepository from '../transfers.repository';
import CursorPaginationTransferParams from '../interfaces/cursor-pagination-transfer-params.interface';
declare class CursorPaginationTransferHelper {
    private io;
    private importStepHelper;
    private transfersRepository;
    constructor(io: IO, importStepHelper: ImportStepHelper, transfersRepository: TransfersRepository);
    transfer(params: CursorPaginationTransferParams): Promise<void>;
}
export default CursorPaginationTransferHelper;
