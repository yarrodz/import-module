import { Server as IO } from 'socket.io';
import IPaginationFunction from './interfaces/pagination-function.interface';
import DatasetsRepository from '../datasets/datasets.repository';
import ImportProcessesRepository from '../import-processes/import-processes.repository';
import { IImportDocument } from '../imports/import.schema';
declare class TransferHelper {
    private io;
    private datasetsRepository;
    private importProcessesRepository;
    constructor(io: IO, datasetsRepository: DatasetsRepository, importProcessesRepository: ImportProcessesRepository);
    paginationTransfer(impt: IImportDocument, processId: string, idColumn: string, datasetsCount: number, offset: number, limit: number, paginationFunction: IPaginationFunction, ...paginationFunctionParams: any[]): Promise<void>;
    chunkTransfer(chunkedDatasets: object[][], impt: IImportDocument, processId: string, idColumn: string): Promise<void>;
    private transformDatasets;
    private transformRecords;
    private parseValue;
    private insertDatasets;
}
export default TransferHelper;
