import { Server as IO } from 'socket.io';
import TransferStepHelper from './transfer-step.helper';
import ImportProcessesRepository from '../import-processes/import-processes.repository';
import { IImportDocument } from '../imports/import.schema';
declare class ChunkTransferHelper {
    private io;
    private transferStepHelper;
    private importProcessesRepository;
    constructor(io: IO, transferStepHelper: TransferStepHelper, importProcessesRepository: ImportProcessesRepository);
    chunkTransfer(impt: IImportDocument, processId: string, chunkedDatasets: object[][]): Promise<void>;
}
export default ChunkTransferHelper;
