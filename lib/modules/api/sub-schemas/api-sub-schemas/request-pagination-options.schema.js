"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequestPaginationOptionsSchema = void 0;
const mongoose_1 = require("mongoose");
const request_paginanation_placement_1 = require("../../enums/request-paginanation-placement");
exports.RequestPaginationOptionsSchema = new mongoose_1.Schema({
    placement: {
        type: String,
        enum: Object.values(request_paginanation_placement_1.RequestPaginationPlacement),
        required: true
    },
    cursorParameter: { type: String, required: false },
    cursorParameterPath: { type: String, required: false },
    offsetParameter: { type: String, required: false },
    limitParameter: { type: String, required: true },
    limitValue: { type: Number, required: true }
}, {
    _id: false
});
//# sourceMappingURL=request-pagination-options.schema.js.map