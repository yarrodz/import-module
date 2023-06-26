import mongoose, { Document, Types } from 'mongoose';
import { ImportSource } from './enums/import-source.enum';
import { IDatabase } from './sub-schemas/database.schema';
import { IField } from './sub-schemas/field.schema';
import { IApi } from './sub-schemas/api.schema';
import { IImap } from './sub-schemas/imap.schema';
export interface IImport {
    unit: Types.ObjectId | string;
    source: ImportSource;
    database?: IDatabase;
    api?: IApi;
    imap?: IImap;
    fields: IField[];
}
export interface IImportDocument extends IImport, Document {
}
declare const _default: mongoose.Model<IImportDocument, {}, {}, {}, mongoose.Document<unknown, {}, IImportDocument> & Omit<IImportDocument & {
    _id: Types.ObjectId;
}, never>, any>;
export default _default;
