"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SqlValidator = void 0;
const joi_1 = __importDefault(require("joi"));
const sql_connection_validator_1 = require("./sub-validators/sql-connection.validator");
const sql_dialect_enum_1 = require("./enums/sql-dialect.enum");
const sql_import_target_enum_1 = require("./enums/sql-import-target.enum");
exports.SqlValidator = joi_1.default.object({
    dialect: joi_1.default.string().valid(...Object.values(sql_dialect_enum_1.SqlDialect)),
    connection: sql_connection_validator_1.SqlConnectionValidator.required(),
    target: joi_1.default.string().valid(...Object.values(sql_import_target_enum_1.SqlImportTarget)),
    table: joi_1.default.string().optional().allow(null),
    select: joi_1.default.string().optional().allow(null),
    limit: joi_1.default.number().required()
});
//# sourceMappingURL=sql.validator.js.map