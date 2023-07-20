"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiSchema = void 0;
const mongoose_1 = require("mongoose");
const request_auth_shema_1 = require("./sub-schemas/api-sub-schemas/request-auth.shema");
// import {
//   IRequestBody,
//   RequestBodySchema
// } from './request-sub-schemas/request-body.shema';
const request_pagination_options_schema_1 = require("./sub-schemas/api-sub-schemas/request-pagination-options.schema");
const request_method_enum_1 = require("./enums/request-method.enum");
const transfer_type_enum_1 = require("../transfer/enums/transfer-type.enum");
const request_response_type_enum_1 = require("./enums/request-response-type.enum");
exports.ApiSchema = new mongoose_1.Schema({
    method: {
        type: String,
        enum: Object.values(request_method_enum_1.RequestMethod),
        required: true
    },
    url: { type: String, required: true },
    auth: { type: request_auth_shema_1.RequestAuthSchema, required: false },
    headers: { type: Object, required: false },
    params: { type: Object, required: false },
    // body:  { type: RequestBodySchema, required: false },
    body: { type: Object, required: false },
    transferType: {
        type: String,
        enum: Object.values(transfer_type_enum_1.TransferType),
        required: true
    },
    paginationOptions: {
        type: request_pagination_options_schema_1.RequestPaginationOptionsSchema,
        required: false
    },
    responseType: {
        type: String,
        enum: Object.values(request_response_type_enum_1.RequestResponseType),
        required: true
    },
    datasetsPath: { type: String, required: true }
}, {
    _id: false
});
//# sourceMappingURL=api.schema.js.map