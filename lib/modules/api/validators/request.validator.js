"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequestValidator = void 0;
const joi_1 = __importDefault(require("joi"));
const request_method_enum_1 = require("../enums/request-method.enum");
exports.RequestValidator = joi_1.default.object({
    method: joi_1.default.string()
        .valid(...Object.values(request_method_enum_1.RequestMethod))
        .required(),
    url: joi_1.default.string().required(),
    headers: joi_1.default.object().optional().allow(null),
    params: joi_1.default.object().optional().allow(null),
    body: joi_1.default.object().optional().allow(null)
});
//# sourceMappingURL=request.validator.js.map