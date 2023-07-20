import ImportProcessesRepository from '../import-processes/import-processes.repository';
import ChunkTransferHelper from '../transfer/chunk-transfer.helper';
import OffsetPaginationTransferHelper from '../transfer/offset-pagination-transfer.helper';
import CursorPaginationTransferHelper from '../transfer/cursor-pagination-transfer.helper';
import ImportTransferFailureHandler from '../transfer/import-transfer-failure.handler';
import IImportTransferFunction from '../transfer/interfaces/import-transfer-function.interface';
declare class ApiTransferHelper {
    private importProcessesRepository;
    private importTransferFailureHandler;
    private chunkTransferHelper;
    private offsetPaginationTransferHelper;
    private cursorPaginationTransferHelper;
    constructor(importProcessesRepository: ImportProcessesRepository, importTransferFailureHandler: ImportTransferFailureHandler, chunkTransferHelper: ChunkTransferHelper, offsetPaginationTransferHelper: OffsetPaginationTransferHelper, cursorPaginationTransferHelper: CursorPaginationTransferHelper);
    transfer: IImportTransferFunction;
    private chunkTransfer;
    private offsetPaginationTranfer;
    private cursorPaginationTranfer;
    private offetPaginationFunction;
    private cursorPaginationFunction;
}
export default ApiTransferHelper;
