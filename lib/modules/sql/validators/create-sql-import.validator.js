"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateSqlImportValidator = void 0;
const joi_1 = __importDefault(require("joi"));
const process_type_enum_1 = require("../../processes/process.type.enum");
const source_enum_1 = require("../../imports/enums/source.enum");
const sql_import_target_enum_1 = require("../enums/sql-import-target.enum");
const import_field_validator_1 = require("../../imports/validators/import-field.validator");
const out_reference_validator_1 = require("../../imports/validators/out-reference.validator");
exports.CreateSqlImportValidator = joi_1.default.object({
    name: joi_1.default.string().min(1).max(128).required(),
    idKey: joi_1.default.string().min(1).max(128).required(),
    type: joi_1.default.string().valid(process_type_enum_1.ProcessType.IMPORT).required(),
    source: joi_1.default.string().valid(source_enum_1.Source.SQL).required(),
    limitRequestsPerSecond: joi_1.default.number().integer().min(1).max(16).required(),
    retryOptions: joi_1.default.object({
        maxAttempts: joi_1.default.number().integer().min(1).max(16).required(),
        attemptTimeDelay: joi_1.default.number().integer().min(1000).max(28800000).required()
    }).required(),
    target: joi_1.default.string()
        .valid(...Object.values(sql_import_target_enum_1.SqlImportTarget))
        .required(),
    table: joi_1.default.string().optional(),
    select: joi_1.default.string().optional(),
    limit: joi_1.default.number().required(),
    fields: joi_1.default.array().items(import_field_validator_1.ImportFieldValidator).optional(),
    __: joi_1.default.object({
        inUnit: out_reference_validator_1.OutReferenceValidator.required(),
        hasConnection: out_reference_validator_1.OutReferenceValidator.required()
    }).required()
});
//# sourceMappingURL=create-sql-import.validator.js.map