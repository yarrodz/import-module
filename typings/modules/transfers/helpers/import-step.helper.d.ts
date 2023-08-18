import { Server as IO } from 'socket.io';
import Transfer from '../interfaces/transfer.interface';
import TransfersRepository from '../transfers.repository';
import SqlImport from '../../sql/interfaces/sql-import.interface';
import ApiImport from '../../api/interfaces/api-import.interface';
import DatasetsRepository from '../../datasets/datasets.repository';
declare class ImportStepHelper {
    private io;
    private transfersRepository;
    private datasetsRepository;
    constructor(io: IO, transfersRepository: TransfersRepository, datasetsRepository: DatasetsRepository);
    step(impt: SqlImport | ApiImport, transfer: Transfer, datasets: object[], cursor?: string): Promise<void>;
    private transformDatasets;
    private transformRecords;
    private parseValue;
    private insertDatasets;
}
export default ImportStepHelper;
