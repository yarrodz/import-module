"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FeatureSchema = void 0;
const mongoose_1 = require("mongoose");
const feature_type_enum_1 = require("./enums/feature-type.enum");
exports.FeatureSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    type: {
        type: String,
        enum: Object.values(feature_type_enum_1.FeatureType),
        required: true
    }
});
//# sourceMappingURL=feature.schema.js.map