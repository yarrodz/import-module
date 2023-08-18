import ApiConnectionHelper from './api-connection.helper';
import TransfersRepository from '../../transfers/transfers.repository';
import TransferFailureHandler from '../../transfers/helpers/transfer-failure.handler';
import ChunkTransferHelper from '../../transfers/helpers/chunk-transfer.helper';
import OffsetPaginationTransferHelper from '../../transfers/helpers/offset-pagination-transfer.helper';
import CursorPaginationTransferHelper from '../../transfers/helpers/cursor-pagination-transfer.helper';
import OuterTransferFunction from '../../transfers/interfaces/outer-transfer-function.interface';
declare class ApiImportHelper {
    private apiConnectionHelper;
    private transferFailureHandler;
    private chunkTransferHelper;
    private offsetPaginationTransferHelper;
    private cursorPaginationTransferHelper;
    private transfersRepository;
    constructor(apiConnectionHelper: ApiConnectionHelper, transferFailureHandler: TransferFailureHandler, chunkTransferHelper: ChunkTransferHelper, offsetPaginationTransferHelper: OffsetPaginationTransferHelper, cursorPaginationTransferHelper: CursorPaginationTransferHelper, transfersRepository: TransfersRepository);
    import: OuterTransferFunction;
    private chunkImport;
    private offsetPaginationImport;
    private cursorPaginationImport;
    private offetPaginationFunction;
    private cursorPaginationFunction;
}
export default ApiImportHelper;
