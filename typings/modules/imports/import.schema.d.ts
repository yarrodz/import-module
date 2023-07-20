import mongoose, { Document, Types } from 'mongoose';
import { ImportSource } from './enums/import-source.enum';
import { ISql } from '../sql/sql.schema';
import { IApi } from '../api/api.schema';
import { IField } from './sub-schemas/field.schema';
export interface IImport {
    unit: Types.ObjectId | string;
    source: ImportSource;
    sql?: ISql;
    api?: IApi;
    fields?: IField[];
    limitRequestsPerSecond: number;
    idColumn: string;
    datasetsCount?: number;
}
export interface IImportDocument extends IImport, Document {
}
declare const _default: mongoose.Model<IImportDocument, {}, {}, {}, mongoose.Document<unknown, {}, IImportDocument> & IImportDocument & {
    _id: Types.ObjectId;
}, any>;
export default _default;
