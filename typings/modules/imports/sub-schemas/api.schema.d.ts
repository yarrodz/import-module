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
import { RequestMethod } from '../enums/request-method.enum';
export interface IApiRequestConfig {
    method: RequestMethod;
    url: string;
    headers?: object;
    params?: object;
    data?: object;
}
export declare const ApiRequestConfigSchema: Schema<IApiRequestConfig, import("mongoose").Model<IApiRequestConfig, any, any, any, import("mongoose").Document<unknown, any, IApiRequestConfig> & Omit<IApiRequestConfig & {
    _id: import("mongoose").Types.ObjectId;
}, never>, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, IApiRequestConfig, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<IApiRequestConfig>> & Omit<import("mongoose").FlatRecord<IApiRequestConfig> & {
    _id: import("mongoose").Types.ObjectId;
}, never>>;
export interface IApi {
    requestConfig: IApiRequestConfig;
    idColumn: string;
    path: string;
}
export declare const ApiSchema: Schema<IApi, import("mongoose").Model<IApi, any, any, any, import("mongoose").Document<unknown, any, IApi> & Omit<IApi & {
    _id: import("mongoose").Types.ObjectId;
}, never>, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, IApi, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<IApi>> & Omit<import("mongoose").FlatRecord<IApi> & {
    _id: import("mongoose").Types.ObjectId;
}, never>>;
