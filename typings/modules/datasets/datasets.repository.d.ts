/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose/types/inferschematype" />
import { Model, Types } from 'mongoose';
import { IDataset } from './dataset.interface';
import RecordsRepository from '../records/records.repository';
declare class DatasetsRepository {
    private datasetModel;
    private recordsRepository;
    constructor(datasetModel: Model<IDataset>, recordsRepository: RecordsRepository);
    create(dataset: IDataset): Promise<void>;
    update(id: string | Types.ObjectId, dataset: IDataset): Promise<void>;
    findByImportAndSourceDatasetIds(importId: string | Types.ObjectId, sourceDatasetId: string): Promise<import("mongoose").Document<unknown, {}, IDataset> & IDataset & {
        _id: Types.ObjectId;
    }>;
}
export default DatasetsRepository;
