import TransfersRepository from '../transfers/transfers.repository';
import SqlColumnsHelper from './helpers/sql-columns.helper';
import SqlImportHelper from './helpers/sql-import.helper';
import SqlImport from './interfaces/sql-import.interface';
import ResponseHandler from '../../utils/response-handler/response-handler';
declare class SqlImportService {
    private sqlColumnsHelper;
    private sqlImportHelper;
    private transfersRepository;
    constructor(sqlColumnsHelper: SqlColumnsHelper, sqlImportHelper: SqlImportHelper, transefersRepository: TransfersRepository);
    getColumns(impt: SqlImport): Promise<ResponseHandler>;
    checkIdColumnUniqueness(impt: SqlImport): Promise<ResponseHandler>;
    import(impt: SqlImport): Promise<ResponseHandler>;
}
export default SqlImportService;
