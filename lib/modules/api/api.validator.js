"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiValidator = void 0;
const joi_1 = __importDefault(require("joi"));
const request_method_enum_1 = require("./enums/request-method.enum");
const request_auth_validator_1 = require("./sub-validators/api-sub-validators/request-auth.validator");
const request_paination_validator_1 = require("./sub-validators/api-sub-validators/request-paination.validator");
const request_response_type_enum_1 = require("./enums/request-response-type.enum");
const transfer_type_enum_1 = require("../transfer/enums/transfer-type.enum");
exports.ApiValidator = joi_1.default.object({
    method: joi_1.default.string()
        .valid(...Object.values(request_method_enum_1.RequestMethod))
        .required(),
    url: joi_1.default.string().required(),
    auth: request_auth_validator_1.RequestAuthValidator.optional().allow(null),
    headers: joi_1.default.object().optional().allow(null),
    params: joi_1.default.object().optional().allow(null),
    body: joi_1.default.object().optional().allow(null),
    transferType: joi_1.default.string()
        .valid(...Object.values(transfer_type_enum_1.TransferType))
        .required(),
    paginationOptions: request_paination_validator_1.RequestPaginationValidator.optional().allow(null),
    responseType: joi_1.default.string()
        .valid(...Object.values(request_response_type_enum_1.RequestResponseType))
        .required(),
    datasetsPath: joi_1.default.string().required()
});
//# sourceMappingURL=api.validator.js.map