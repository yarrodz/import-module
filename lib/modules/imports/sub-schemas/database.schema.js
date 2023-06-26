"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseSchema = exports.DatabaseConnectionSchema = void 0;
const mongoose_1 = require("mongoose");
exports.DatabaseConnectionSchema = new mongoose_1.Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    database: { type: String, required: true },
    host: { type: String, required: true },
    port: { type: Number, required: true }
}, {
    _id: false
});
exports.DatabaseSchema = new mongoose_1.Schema({
    connection: { type: exports.DatabaseConnectionSchema, required: true },
    idColumn: { type: String, required: true },
    table: { type: String, required: false },
    customSelect: { type: String, required: false },
    datasetsCount: { type: Number, required: false }
}, {
    _id: false
});
//# sourceMappingURL=database.schema.js.map