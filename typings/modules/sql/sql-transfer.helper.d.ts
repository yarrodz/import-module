import ImportProcessesRepository from '../import-processes/import-processes.repository';
import ImportTransferFailureHandler from '../transfer/import-transfer-failure.handler';
import OffsetPaginationTransferHelper from '../transfer/offset-pagination-transfer.helper';
import IImportTransferFunction from '../transfer/interfaces/import-transfer-function.interface';
declare class SqlTransferHelper {
    private importProcessesRepository;
    private importTransferFailureHandler;
    private offsetPaginationTransferHelper;
    constructor(importProcessesRepository: ImportProcessesRepository, importTransferFailureHandler: ImportTransferFailureHandler, offsetPaginationTransferHelper: OffsetPaginationTransferHelper);
    transfer: IImportTransferFunction;
    private transferFromTable;
    private transferFromSelect;
    private tablePaginationFunction;
    private selectPaginationFunction;
}
export default SqlTransferHelper;
