"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FieldSchema = void 0;
const mongoose_1 = require("mongoose");
const feature_schema_1 = require("../../features/feature.schema");
exports.FieldSchema = new mongoose_1.Schema({
    feature: { type: feature_schema_1.FeatureSchema, required: true },
    source: { type: String, required: true }
}, {
    _id: false
});
//# sourceMappingURL=field.schema.js.map