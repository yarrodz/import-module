"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OutReferenceValidator = void 0;
const joi_1 = __importDefault(require("joi"));
exports.OutReferenceValidator = joi_1.default.object({
    id: joi_1.default.number().required(),
    _d: joi_1.default.string().valid('out').required()
});
//# sourceMappingURL=out-reference.validator.js.map