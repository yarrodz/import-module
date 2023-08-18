"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateApiImportValidator = void 0;
const joi_1 = __importDefault(require("joi"));
const process_type_enum_1 = require("../../processes/process.type.enum");
const source_enum_1 = require("../../imports/enums/source.enum");
const transfer_method_enum_1 = require("../../transfers/enums/transfer-method.enum");
const pagination_options_validator_1 = require("./pagination-options.validator");
const request_validator_1 = require("./request.validator");
const import_field_validator_1 = require("../../imports/validators/import-field.validator");
const out_reference_validator_1 = require("../../imports/validators/out-reference.validator");
exports.CreateApiImportValidator = joi_1.default.object({
    name: joi_1.default.string().min(1).max(128).required(),
    idKey: joi_1.default.string().min(1).max(128).required(),
    type: joi_1.default.string().valid(process_type_enum_1.ProcessType.IMPORT).required(),
    source: joi_1.default.string().valid(source_enum_1.Source.API).required(),
    limitRequestsPerSecond: joi_1.default.number().integer().min(1).max(16).required(),
    retryOptions: joi_1.default.object({
        maxAttempts: joi_1.default.number().integer().min(1).max(16).required(),
        attemptTimeDelay: joi_1.default.number().integer().min(1000).max(28800000).required()
    }).required(),
    request: request_validator_1.RequestValidator.required(),
    transferMethod: joi_1.default.string()
        .valid(...Object.values(transfer_method_enum_1.TransferMethod))
        .required(),
    paginationOptions: pagination_options_validator_1.PaginationOptionsValidator.optional(),
    idPath: joi_1.default.string().required(),
    datasetsPath: joi_1.default.string().required(),
    fields: joi_1.default.array().items(import_field_validator_1.ImportFieldValidator).optional(),
    __: joi_1.default.object({
        inUnit: out_reference_validator_1.OutReferenceValidator.required(),
        hasConnection: out_reference_validator_1.OutReferenceValidator.required()
    }).required()
});
//# sourceMappingURL=create-api-import.validator.js.map