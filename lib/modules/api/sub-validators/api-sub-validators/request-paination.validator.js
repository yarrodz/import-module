"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequestPaginationValidator = void 0;
const joi_1 = __importDefault(require("joi"));
const request_paginanation_placement_1 = require("../../enums/request-paginanation-placement");
exports.RequestPaginationValidator = joi_1.default.object({
    placement: joi_1.default.string().valid(...Object.values(request_paginanation_placement_1.RequestPaginationPlacement)),
    cursorParameter: joi_1.default.string().optional().allow(null),
    cursorParameterPath: joi_1.default.string().optional().allow(null),
    offsetParameter: joi_1.default.string().optional().allow(null),
    limitParameter: joi_1.default.string(),
    limitValue: joi_1.default.number()
});
//# sourceMappingURL=request-paination.validator.js.map