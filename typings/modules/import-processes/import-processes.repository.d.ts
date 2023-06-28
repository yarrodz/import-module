import { IImportProcess, IImportProcessDocument } from './import-process.schema';
import { CreateImportProcessInput } from './inputs/create-imort-process.input';
import { Model, UpdateQuery } from 'mongoose';
declare class ImportProcessesRepository {
    private importProcessModel;
    constructor(importProcessModel: Model<IImportProcess>);
    create(input: CreateImportProcessInput): Promise<IImportProcessDocument>;
    findAll(unit: string): Promise<IImportProcessDocument[]>;
    findPending(): Promise<IImportProcessDocument[]>;
    findById(id: string): Promise<IImportProcessDocument>;
    findPendingByUnit(unit: string): Promise<IImportProcessDocument>;
    update(id: string, updateQuery: UpdateQuery<IImportProcess>): Promise<IImportProcessDocument>;
    delete(id: string): Promise<void>;
}
export default ImportProcessesRepository;
