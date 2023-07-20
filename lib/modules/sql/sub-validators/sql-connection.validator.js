"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SqlConnectionValidator = void 0;
const joi_1 = __importDefault(require("joi"));
exports.SqlConnectionValidator = joi_1.default.object({
    username: joi_1.default.string().required(),
    password: joi_1.default.string().required(),
    host: joi_1.default.string().required(),
    port: joi_1.default.number().integer().required(),
    database: joi_1.default.string().required()
});
//# sourceMappingURL=sql-connection.validator.js.map