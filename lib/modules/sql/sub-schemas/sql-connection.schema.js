"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SqlConnectionSchema = void 0;
const mongoose_1 = require("mongoose");
exports.SqlConnectionSchema = new mongoose_1.Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    database: { type: String, required: true },
    host: { type: String, required: true },
    port: { type: Number, required: true }
}, {
    _id: false
});
//# sourceMappingURL=sql-connection.schema.js.map