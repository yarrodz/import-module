"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SqlConnectionConfigValidator = void 0;
const joi_1 = __importDefault(require("joi"));
const sql_dialect_enum_1 = require("../enums/sql-dialect.enum");
exports.SqlConnectionConfigValidator = joi_1.default.object({
    dialect: joi_1.default.string().valid(...Object.values(sql_dialect_enum_1.SqlDialect)),
    username: joi_1.default.string().required(),
    password: joi_1.default.string().required(),
    host: joi_1.default.string().required(),
    port: joi_1.default.number().integer().required(),
    database: joi_1.default.string().required()
});
//# sourceMappingURL=sql-connection-config.validator.js.map