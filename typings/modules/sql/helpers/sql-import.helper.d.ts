import TransferFailureHandler from '../../transfers/helpers/transfer-failure.handler';
import OffsetPaginationTransferHelper from '../../transfers/helpers/offset-pagination-transfer.helper';
import OuterTransferFunction from '../../transfers/interfaces/outer-transfer-function.interface';
import TransfersRepository from '../../transfers/transfers.repository';
declare class SqlImportHelper {
    private transferFailureHandler;
    private offsetPaginationTransferHelper;
    private transfersReporisotory;
    constructor(transferFailureHandler: TransferFailureHandler, offsetPaginationTransferHelper: OffsetPaginationTransferHelper, transfersReporisotory: TransfersRepository);
    import: OuterTransferFunction;
    private tableImport;
    private selectImport;
    private tablePaginationFunction;
    private selectPaginationFunction;
}
export default SqlImportHelper;
