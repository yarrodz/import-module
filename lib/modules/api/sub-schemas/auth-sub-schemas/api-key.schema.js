"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiKeySchema = void 0;
const mongoose_1 = require("mongoose");
const api_key_placement_enum_1 = require("../../enums/api-key-placement.enum");
exports.ApiKeySchema = new mongoose_1.Schema({
    key: { type: String, required: true },
    value: { type: String, required: true },
    placement: {
        type: String,
        enum: Object.values(api_key_placement_enum_1.ApiKeyPlacement),
        required: true
    }
}, {
    _id: false
});
//# sourceMappingURL=api-key.schema.js.map