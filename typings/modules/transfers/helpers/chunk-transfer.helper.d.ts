import { Server as IO } from 'socket.io';
import ImportStepHelper from './import-step.helper';
import TransfersRepository from '../transfers.repository';
import ChunkTransferParams from '../interfaces/chunk-transfer-params.interface';
declare class ChunkTransferHelper {
    private io;
    private importStepHelper;
    private transfersRepository;
    constructor(io: IO, importStepHelper: ImportStepHelper, transfersRepository: TransfersRepository);
    transfer(params: ChunkTransferParams): Promise<void>;
    private chunkObjectArray;
}
export default ChunkTransferHelper;
