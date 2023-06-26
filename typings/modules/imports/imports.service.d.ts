import ImportsRepository from './imports.repository';
import ImportProcessesRepository from '../import-processes/import-processes.repository';
import TransferService from '../transfer/transfer.service';
import ColumnsService from '../columns/columns.service';
import ResponseHandler from '../../utils/response-handler/response-handler';
import { IImport } from './import.schema';
import { IField } from './sub-schemas/field.schema';
declare class ImportsService {
    private importsRepository;
    private importProcessesRepository;
    private columnsService;
    private transferService;
    constructor(importsRepository: ImportsRepository, importProcessesRepository: ImportProcessesRepository, columnsService: ColumnsService, transferService: TransferService);
    findAll(unit: string): Promise<ResponseHandler>;
    create(createImportInput: IImport): Promise<ResponseHandler>;
    update(id: string, updateImportInput: IImport): Promise<ResponseHandler>;
    delete(id: string): Promise<ResponseHandler>;
    connect(id: string): Promise<ResponseHandler>;
    setFields(id: string, fieldInputs: IField[]): Promise<ResponseHandler>;
    start(id: string): Promise<ResponseHandler>;
}
export default ImportsService;
