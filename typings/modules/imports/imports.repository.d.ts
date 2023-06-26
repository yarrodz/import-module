import { Model, UpdateQuery } from 'mongoose';
import { IImport, IImportDocument } from './import.schema';
declare class ImportsRepository {
    private importsModel;
    constructor(importsModel: Model<IImport>);
    create(input: IImport): Promise<IImportDocument>;
    findAll(unit: string): Promise<IImportDocument[]>;
    findById(id: string): Promise<IImportDocument>;
    update(id: string, updateQuery: UpdateQuery<IImport>): Promise<IImport>;
    delete(id: string): Promise<void>;
}
export default ImportsRepository;
