import SqlColumnsHelper from './sql-columns.helper';
import SqlTransferHelper from './sql-transfer.helper';
import ResponseHandler from '../../utils/response-handler/response-handler';
import ImportProcessesRepository from '../import-processes/import-processes.repository';
import { IImportProcessDocument } from '../import-processes/import-process.schema';
import { IImportDocument } from '../imports/import.schema';
declare class SqlImportService {
    private sqlColumnsHelper;
    private sqlTransferHelper;
    private importProcessesRepository;
    constructor(sqlColumnsHelper: SqlColumnsHelper, sqlTransferHelper: SqlTransferHelper, importProcessesRepository: ImportProcessesRepository);
    connect(impt: IImportDocument): Promise<ResponseHandler>;
    start(impt: IImportDocument): Promise<ResponseHandler>;
    reload(impt: IImportDocument, process: IImportProcessDocument): Promise<ResponseHandler>;
    retry(impt: IImportDocument, process: IImportProcessDocument): Promise<ResponseHandler>;
}
export default SqlImportService;
