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
import { Schema } from 'mongoose';
import { DatabaseImportTarget } from '../enums/database-import-target.enum';
export interface IDatabaseConnection {
    username: string;
    password: string;
    database: string;
    host: string;
    port: number;
}
export declare const DatabaseConnectionSchema: Schema<IDatabaseConnection, import("mongoose").Model<IDatabaseConnection, any, any, any, import("mongoose").Document<unknown, any, IDatabaseConnection> & Omit<IDatabaseConnection & {
    _id: import("mongoose").Types.ObjectId;
}, never>, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, IDatabaseConnection, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<IDatabaseConnection>> & Omit<import("mongoose").FlatRecord<IDatabaseConnection> & {
    _id: import("mongoose").Types.ObjectId;
}, never>>;
export interface IDatabase {
    connection: IDatabaseConnection;
    idColumn: string;
    target: DatabaseImportTarget;
    table?: string;
    customSelect?: string;
    datasetsCount?: number;
}
export declare const DatabaseSchema: Schema<IDatabase, import("mongoose").Model<IDatabase, any, any, any, import("mongoose").Document<unknown, any, IDatabase> & Omit<IDatabase & {
    _id: import("mongoose").Types.ObjectId;
}, never>, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, IDatabase, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<IDatabase>> & Omit<import("mongoose").FlatRecord<IDatabase> & {
    _id: import("mongoose").Types.ObjectId;
}, never>>;
