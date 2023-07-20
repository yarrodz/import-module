"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImportValidator = void 0;
const joi_1 = __importDefault(require("joi"));
const import_source_enum_1 = require("./enums/import-source.enum");
const sql_validator_1 = require("../sql/sql.validator");
const api_validator_1 = require("../api/api.validator");
exports.ImportValidator = joi_1.default.object({
    unit: joi_1.default.string().length(24).required(),
    source: joi_1.default.string().valid(...Object.values(import_source_enum_1.ImportSource)),
    sql: sql_validator_1.SqlValidator.optional().allow(null),
    api: api_validator_1.ApiValidator.optional().allow(null),
    idColumn: joi_1.default.string().optional().allow(null),
    datasetsCount: joi_1.default.number().integer().optional().allow(null),
    limitRequestsPerSecond: joi_1.default.number().optional().allow(null)
});
//# sourceMappingURL=import.validator.js.map