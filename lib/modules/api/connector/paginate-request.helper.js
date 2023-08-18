"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const transfer_method_enum_1 = require("../../transfers/enums/transfer-method.enum");
const request_pagination_placement_1 = require("../enums/request-pagination-placement");
class PaginateRequestHelper {
    static paginate(request, paginationType, paginationOptions, pagination) {
        if (paginationOptions === undefined || pagination === undefined) {
            return;
        }
        const { placement } = paginationOptions;
        switch (placement) {
            case request_pagination_placement_1.RequestPaginationPlacement.QUERY_PARAMETERS:
                this.paginateQueryParams(request, paginationType, paginationOptions, pagination);
                break;
            case request_pagination_placement_1.RequestPaginationPlacement.BODY:
                this.paginateBody(request, paginationType, paginationOptions, pagination);
                break;
            default: {
                throw new Error(`Error while paginating request. Unknown pagination placement: '${placement}'.`);
            }
        }
    }
    static paginateQueryParams(request, paginationType, paginationOptions, pagination) {
        switch (paginationType) {
            case transfer_method_enum_1.TransferMethod.OFFSET_PAGINATION: {
                const { offsetKey, limitKey } = paginationOptions;
                const { offset, limit } = pagination;
                request.params = request.params || {};
                request.params[offsetKey] = offset;
                request.params[limitKey] = limit;
                break;
            }
            case transfer_method_enum_1.TransferMethod.CURSOR_PAGINATION: {
                const { cursorKey, limitKey } = paginationOptions;
                const { cursor, limit } = pagination;
                request.params = request.params || {};
                request.params[cursorKey] = cursor;
                request.params[limitKey] = limit;
                break;
            }
            default: {
                throw new Error(`Error while paginating request. Unknown pagination type: '${paginationType}'.`);
            }
        }
    }
    static paginateBody(request, paginationType, paginationOptions, pagination) {
        switch (paginationType) {
            case transfer_method_enum_1.TransferMethod.OFFSET_PAGINATION: {
                const { offsetKey, limitKey } = paginationOptions;
                const { offset, limit } = pagination;
                request.data = request.data || {};
                request.data[offsetKey] = offset;
                request.data[limitKey] = limit;
                break;
            }
            case transfer_method_enum_1.TransferMethod.CURSOR_PAGINATION: {
                const { cursorKey, limitKey } = paginationOptions;
                const { cursor, limit } = pagination;
                request.data = request.data || {};
                request.data[cursorKey] = cursor;
                request.data[limitKey] = limit;
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