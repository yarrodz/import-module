"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FieldValidator = void 0;
const joi_1 = __importDefault(require("joi"));
const feature_type_enum_1 = require("../../features/enums/feature-type.enum");
exports.FieldValidator = joi_1.default.object({
    feature: joi_1.default.object({
        _id: joi_1.default.string().length(24).required(),
        name: joi_1.default.string().required(),
        type: joi_1.default.string().valid(...Object.values(feature_type_enum_1.FeatureType))
    }).required(),
    source: joi_1.default.string().required()
});
//# sourceMappingURL=field.validator.js.map