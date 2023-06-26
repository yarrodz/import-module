"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiSchema = exports.ApiRequestConfigSchema = void 0;
const mongoose_1 = require("mongoose");
// import { AxiosRequestConfig } from 'axios';
const request_method_enum_1 = require("../enums/request-method.enum");
exports.ApiRequestConfigSchema = new mongoose_1.Schema({
    method: {
        type: String,
        enum: Object.values(request_method_enum_1.RequestMethod),
        required: true
    },
    url: { type: String, default: 'data' },
    headers: { type: Object, default: 'data' },
    params: { type: Object, default: 'data' },
    data: { type: Object, default: 'data' }
}, {
    _id: false
});
exports.ApiSchema = new mongoose_1.Schema({
    requestConfig: { type: exports.ApiRequestConfigSchema, required: true },
    idColumn: { type: String, required: true },
    path: { type: String, required: true }
}, {
    _id: false
});
//# sourceMappingURL=api.schema.js.map