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
import { RequestAuthType } from '../../enums/request-auth-type.enum';
import { IApiKey } from '../auth-sub-schemas/api-key.schema';
import { IBasicDigest } from '../auth-sub-schemas/basic-digest.schema';
import { IBearer } from '../auth-sub-schemas/bearer.schema';
import { IOAuth2 } from '../../../oauth2/oauth2.schema';
export interface IRequestAuth {
    type: RequestAuthType;
    apiKey?: IApiKey;
    basicDigest?: IBasicDigest;
    bearer?: IBearer;
    oauth2?: IOAuth2;
}
export declare const RequestAuthSchema: Schema<IRequestAuth, import("mongoose").Model<IRequestAuth, any, any, any, import("mongoose").Document<unknown, any, IRequestAuth> & IRequestAuth & {
    _id: import("mongoose").Types.ObjectId;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, IRequestAuth, import("mongoose").Document<unknown, {}, IRequestAuth> & IRequestAuth & {
    _id: import("mongoose").Types.ObjectId;
}>;
