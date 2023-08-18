"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateSqlConnectionValidator = void 0;
const joi_1 = __importDefault(require("joi"));
const source_enum_1 = require("../../imports/enums/source.enum");
const sql_connection_config_validator_1 = require("./sql-connection-config.validator");
const out_reference_validator_1 = require("../../imports/validators/out-reference.validator");
exports.UpdateSqlConnectionValidator = joi_1.default.object({
    id: joi_1.default.number().integer().required(),
    name: joi_1.default.string().min(1).max(128).optional(),
    source: joi_1.default.string().valid(source_enum_1.Source.SQL).optional(),
    config: sql_connection_config_validator_1.SqlConnectionConfigValidator.optional(),
    __: joi_1.default.object({
        inUnit: out_reference_validator_1.OutReferenceValidator.required()
    }).optional()
});
//# sourceMappingURL=update-sql-connection.validator.js.map