"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BasicDigestSchema = void 0;
const mongoose_1 = require("mongoose");
exports.BasicDigestSchema = new mongoose_1.Schema({
    username: { type: String, required: true },
    password: { type: String, required: true }
}, {
    _id: false
});
//# sourceMappingURL=basic-digest.schema.js.map