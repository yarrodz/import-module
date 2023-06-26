"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImapSchema = exports.ImapConnectionSchema = void 0;
const mongoose_1 = require("mongoose");
exports.ImapConnectionSchema = new mongoose_1.Schema({
    user: { type: String, required: true },
    password: { type: String, required: true },
    host: { type: String, required: true },
    port: { type: Number, required: true },
    tls: { type: Boolean, required: true }
});
exports.ImapSchema = new mongoose_1.Schema({
    connection: { type: exports.ImapConnectionSchema, required: true }
});
//# sourceMappingURL=imap.schema.js.map