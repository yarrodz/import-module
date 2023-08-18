import { Server as IO } from 'socket.io';
import ImportStepHelper from './import-step.helper';
import TransfersRepository from '../transfers.repository';
import OffsetPaginationTransferParams from '../interfaces/offset-pagination-transfer-params.interface';
declare class OffsetPaginationTransferHelper {
    private io;
    private importStepHelper;
    private transfersRepository;
    constructor(io: IO, importStepHelper: ImportStepHelper, transfersRepository: TransfersRepository);
    transfer(params: OffsetPaginationTransferParams): Promise<void>;
}
export default OffsetPaginationTransferHelper;
