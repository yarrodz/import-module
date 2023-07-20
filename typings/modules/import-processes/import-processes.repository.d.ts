import { Model, Types, UpdateQuery } from 'mongoose';
import { IImportProcess, IImportProcessDocument } from './import-process.schema';
declare class ImportProcessesRepository {
    private importProcessModel;
    constructor(importProcessModel: Model<IImportProcess>);
    create(input: Partial<IImportProcess>): Promise<IImportProcessDocument>;
    findAll(unit: string): Promise<IImportProcessDocument[]>;
    findById(id: string | Types.ObjectId): Promise<IImportProcessDocument>;
    findPendingByUnit(unit: string): Promise<IImportProcessDocument>;
    findPending(): Promise<IImportProcessDocument[]>;
    update(id: string, updateQuery: UpdateQuery<IImportProcess>): Promise<IImportProcessDocument>;
    delete(id: string): Promise<void>;
}
export default ImportProcessesRepository;
