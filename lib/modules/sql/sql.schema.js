"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SqlSchema = void 0;
const mongoose_1 = require("mongoose");
const sql_connection_schema_1 = require("./sub-schemas/sql-connection.schema");
const sql_dialect_enum_1 = require("./enums/sql-dialect.enum");
const sql_import_target_enum_1 = require("./enums/sql-import-target.enum");
exports.SqlSchema = new mongoose_1.Schema({
    dialect: {
        type: String,
        enum: Object.values(sql_dialect_enum_1.SqlDialect),
        required: true
    },
    target: {
        type: String,
        enum: Object.values(sql_import_target_enum_1.SqlImportTarget),
        required: true
    },
    connection: { type: sql_connection_schema_1.SqlConnectionSchema, required: true },
    table: { type: String, required: false },
    select: { type: String, required: false },
    limit: { type: Number, required: true }
}, {
    _id: false
});
//# sourceMappingURL=sql.schema.js.map