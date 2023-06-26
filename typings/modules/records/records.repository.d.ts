import { Model, Types } from 'mongoose';
import { IRecord, IRecordDocument } from './record.interface';
declare class RecordsRepository {
    private recordModel;
    constructor(recordModel: Model<IRecord>);
    createMany(records: Partial<IRecord>[], datasetId: string | Types.ObjectId): Promise<IRecordDocument[]>;
    archiveRecords(datasetId: string | Types.ObjectId): Promise<void>;
}
export default RecordsRepository;
