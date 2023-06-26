import { IImportDocument } from '../../imports/import.schema';
import ImportProcessesRepository from '../../import-processes/import-processes.repository';
import TransferHelper from '../transfer.helper';
import { IImportProcessDocument } from '../../import-processes/import-process.schema';
declare class TransferSQLService {
    private importProcessesRepository;
    private transferHelper;
    constructor(importProcessesRepository: ImportProcessesRepository, transferHelper: TransferHelper);
    transfer(impt: IImportDocument, process: IImportProcessDocument, limit: number): Promise<void>;
    private transferFromTable;
    private transferFromCustomSelect;
    private tablePaginationFunction;
    private customSelectPaginationFunction;
}
export default TransferSQLService;
