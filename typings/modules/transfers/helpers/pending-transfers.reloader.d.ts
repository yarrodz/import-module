import SqlImportHelper from '../../sql/helpers/sql-import.helper';
import ApoImportHelper from '../../api/helpers/api-import.helper';
import TransfersRepository from '../transfers.repository';
declare class PendingTransfersReloader {
    sqlImportHelper: SqlImportHelper;
    apiImportHelper: ApoImportHelper;
    transfersRepository: TransfersRepository;
    constructor(sqlImportHelper: SqlImportHelper, apiImportHelper: ApoImportHelper, transfersRepository: TransfersRepository);
    reload(): Promise<void>;
}
export default PendingTransfersReloader;
