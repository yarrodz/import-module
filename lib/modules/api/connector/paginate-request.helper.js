"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const request_paginanation_placement_1 = require("../enums/request-paginanation-placement");
const transfer_type_enum_1 = require("../../transfer/enums/transfer-type.enum");
class PaginateRequestHelper {
    paginate(request, paginationType, paginationOptions, pagination) {
        if (!paginationOptions || !pagination) {
            return;
        }
        const { placement } = paginationOptions;
        switch (placement) {
            case request_paginanation_placement_1.RequestPaginationPlacement.QUERY_PARAMETERS:
                this.paginateQueryParams(request, paginationType, paginationOptions, pagination);
                break;
            case request_paginanation_placement_1.RequestPaginationPlacement.BODY:
                this.paginateBody(request, paginationType, paginationOptions, pagination);
                break;
            default: {
                throw new Error(`Error while paginating request. Unknown pagination placement: '${placement}'.`);
            }
        }
    }
    paginateQueryParams(request, paginationType, paginationOptions, pagination) {
        switch (paginationType) {
            case transfer_type_enum_1.TransferType.OFFSET_PAGINATION: {
                const { offsetParameter, limitParameter } = paginationOptions;
                const { offset, limit } = pagination;
                request.params = request.params || {};
                request.params[offsetParameter] = offset;
                request.params[limitParameter] = limit;
                break;
            }
            case transfer_type_enum_1.TransferType.CURSOR_PAGINATION: {
                const { cursorParameter, limitParameter } = paginationOptions;
                const { cursor, limit } = pagination;
                request.params = request.params || {};
                request.params[cursorParameter] = cursor;
                request.params[limitParameter] = limit;
                break;
            }
            default: {
                throw new Error(`Error while paginating request. Unknown pagination type: '${paginationType}'.`);
            }
        }
    }
    paginateBody(request, paginationType, paginationOptions, pagination) {
        switch (paginationType) {
            case transfer_type_enum_1.TransferType.OFFSET_PAGINATION: {
                const { offsetParameter, limitParameter } = paginationOptions;
                const { offset, limit } = pagination;
                request.data = request.data || {};
                request.data[offsetParameter] = offset;
                request.data[limitParameter] = limit;
                break;
            }
            case transfer_type_enum_1.TransferType.CURSOR_PAGINATION: {
                const { cursorParameter, limitParameter } = paginationOptions;
                const { cursor, limit } = pagination;
                request.data = request.data || {};
                request.data[cursorParameter] = cursor;
                request.data[limitParameter] = limit;
                break;
            }
            default: {
                throw new Error(`Error while paginating request. Unknown pagination type: '${paginationType}'.`);
            }
        }
    }
}
exports.default = PaginateRequestHelper;
//# sourceMappingURL=paginate-request.helper.js.map