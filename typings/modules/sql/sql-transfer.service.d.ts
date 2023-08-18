import TransfersRepository from '../transfers/transfers.repository';
import SqlImportHelper from './helpers/sql-import.helper';
import ResponseHandler from '../../utils/response-handler/response-handler';
import Transfer from '../transfers/interfaces/transfer.interface';
import SqlImport from './interfaces/sql-import.interface';
declare class SqlTransferService {
    private sqlImportHelper;
    private transfersRepository;
    constructor(sqlImportHelper: SqlImportHelper, transfersRepository: TransfersRepository);
    reload(impt: SqlImport, transfer: Transfer): Promise<ResponseHandler>;
    retry(impt: SqlImport, transfer: Transfer): Promise<ResponseHandler>;
}
export default SqlTransferService;
