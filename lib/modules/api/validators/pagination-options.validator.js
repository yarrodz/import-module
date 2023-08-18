"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaginationOptionsValidator = void 0;
const joi_1 = __importDefault(require("joi"));
const request_pagination_placement_1 = require("../enums/request-pagination-placement");
exports.PaginationOptionsValidator = joi_1.default.object({
    placement: joi_1.default.string()
        .valid(...Object.values(request_pagination_placement_1.RequestPaginationPlacement))
        .required(),
    cursorKey: joi_1.default.string().min(1).max(128).optional().allow(null),
    cursorPath: joi_1.default.string().min(1).max(128).optional().allow(null),
    offsetKey: joi_1.default.string().min(1).max(128).optional().allow(null),
    limitKey: joi_1.default.string().min(1).max(128).required(),
    limitValue: joi_1.default.number().integer().min(1).max(1024).required()
});
//# sourceMappingURL=pagination-options.validator.js.map