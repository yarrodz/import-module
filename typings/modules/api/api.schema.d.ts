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
import { IRequestAuth } from './sub-schemas/api-sub-schemas/request-auth.shema';
import { IRequestPaginationOptions } from './sub-schemas/api-sub-schemas/request-pagination-options.schema';
import { RequestMethod } from './enums/request-method.enum';
import { TransferType } from '../transfer/enums/transfer-type.enum';
import { RequestResponseType } from './enums/request-response-type.enum';
export interface IApi {
    method: RequestMethod;
    url: string;
    auth?: IRequestAuth;
    headers?: object;
    params?: object;
    body?: object;
    transferType: TransferType;
    paginationOptions?: IRequestPaginationOptions;
    responseType: RequestResponseType;
    datasetsPath: string;
}
export declare const ApiSchema: Schema<IApi, import("mongoose").Model<IApi, any, any, any, import("mongoose").Document<unknown, any, IApi> & IApi & {
    _id: import("mongoose").Types.ObjectId;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, IApi, import("mongoose").Document<unknown, {}, IApi> & IApi & {
    _id: import("mongoose").Types.ObjectId;
}>;
