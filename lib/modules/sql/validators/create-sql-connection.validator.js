"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateSqlConnectionValidator = void 0;
const joi_1 = __importDefault(require("joi"));
const sql_connection_config_validator_1 = require("./sql-connection-config.validator");
const source_enum_1 = require("../../imports/enums/source.enum");
const out_reference_validator_1 = require("../../imports/validators/out-reference.validator");
exports.CreateSqlConnectionValidator = joi_1.default.object({
    name: joi_1.default.string().min(1).max(128).required(),
    source: joi_1.default.string().valid(source_enum_1.Source.SQL).required(),
    config: sql_connection_config_validator_1.SqlConnectionConfigValidator.required(),
    __: joi_1.default.object({
        inUnit: out_reference_validator_1.OutReferenceValidator.required()
    }).required()
});
//# sourceMappingURL=create-sql-connection.validator.js.map