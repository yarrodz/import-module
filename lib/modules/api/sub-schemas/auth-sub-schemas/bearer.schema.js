"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BearerSchema = void 0;
const mongoose_1 = require("mongoose");
exports.BearerSchema = new mongoose_1.Schema({
    token: { type: String, required: false }
}, {
    _id: false
});
//# sourceMappingURL=bearer.schema.js.map