import { Server as IO } from 'socket.io';
import DatasetsRepository from '../datasets/datasets.repository';
import ImportProcessesRepository from '../import-processes/import-processes.repository';
import { IImportDocument } from '../imports/import.schema';
declare class TransferStepHelper {
    private io;
    private datasetsRepository;
    private importProcessesRepository;
    constructor(io: IO, datasetsRepository: DatasetsRepository, importProcessesRepository: ImportProcessesRepository);
    transferStep(impt: IImportDocument, processId: string, datasets: object[], cursor?: string): Promise<void>;
    private transformDatasets;
    private transformRecords;
    private parseValue;
    private insertDatasets;
}
export default TransferStepHelper;
