"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiKeyValidator = void 0;
const joi_1 = __importDefault(require("joi"));
const api_key_placement_enum_1 = require("../../enums/api-key-placement.enum");
exports.ApiKeyValidator = joi_1.default.object({
    key: joi_1.default.string().required(),
    value: joi_1.default.string().required(),
    placement: joi_1.default.string()
        .valid(...Object.values(api_key_placement_enum_1.ApiKeyPlacement))
        .required()
});
//# sourceMappingURL=api-key.validator.js.map