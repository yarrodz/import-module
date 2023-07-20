import { Model, Types, UpdateQuery } from 'mongoose';
import { IImport, IImportDocument } from './import.schema';
declare class ImportsRepository {
    private importsModel;
    constructor(importsModel: Model<IImport>);
    create(input: IImport): Promise<IImportDocument>;
    findAll(unit: string): Promise<IImportDocument[]>;
    findById(id: string | Types.ObjectId): Promise<IImportDocument>;
    update(id: string, updateQuery: UpdateQuery<IImport>): Promise<IImportDocument>;
    delete(id: string): Promise<void>;
}
export default ImportsRepository;
