import mongoose, { Document, Types } from 'mongoose';
import { ImportStatus } from './enums/import-status.enum';
export interface IImportProcess {
    unit: Types.ObjectId | string;
    import: Types.ObjectId | string;
    status: ImportStatus;
    datasetsCount: number;
    processedDatasetsCount: number;
    transferedDatasetsCount: number;
    log: string[];
    attempts: number;
    errorMessage?: string;
}
export interface IImportProcessDocument extends IImportProcess, Document {
}
export declare const ImportProcessSchema: mongoose.Schema<IImportProcess, mongoose.Model<IImportProcess, any, any, any, mongoose.Document<unknown, any, IImportProcess> & Omit<IImportProcess & {
    _id: Types.ObjectId;
}, never>, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, IImportProcess, mongoose.Document<unknown, {}, mongoose.FlatRecord<IImportProcess>> & Omit<mongoose.FlatRecord<IImportProcess> & {
    _id: Types.ObjectId;
}, never>>;
declare const _default: mongoose.Model<IImportProcessDocument, {}, {}, {}, mongoose.Document<unknown, {}, IImportProcessDocument> & Omit<IImportProcessDocument & {
    _id: Types.ObjectId;
}, never>, any>;
export default _default;
