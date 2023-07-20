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
import { ISqlConnection } from './sub-schemas/sql-connection.schema';
import { SqlDialect } from './enums/sql-dialect.enum';
import { SqlImportTarget } from './enums/sql-import-target.enum';
export interface ISql {
    dialect: SqlDialect;
    connection: ISqlConnection;
    target: SqlImportTarget;
    table?: string;
    select?: string;
    limit: number;
}
export declare const SqlSchema: Schema<ISql, import("mongoose").Model<ISql, any, any, any, import("mongoose").Document<unknown, any, ISql> & ISql & {
    _id: import("mongoose").Types.ObjectId;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, ISql, import("mongoose").Document<unknown, {}, ISql> & ISql & {
    _id: import("mongoose").Types.ObjectId;
}>;
