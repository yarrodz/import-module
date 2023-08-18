import { AxiosRequestConfig } from 'axios';
import { TransferMethod } from '../../transfers/enums/transfer-method.enum';
import RequestPaginationOptions from '../interfaces/request-pagination-options.interface';
import OffsetPagination from '../../transfers/interfaces/offset-pagination.interface';
import CursorPagination from '../../transfers/interfaces/cursor-pagination.interface';
declare class PaginateRequestHelper {
    static paginate(request: AxiosRequestConfig, paginationType: TransferMethod, paginationOptions?: RequestPaginationOptions, pagination?: OffsetPagination | CursorPagination): void;
    private static paginateQueryParams;
    private static paginateBody;
}
export default PaginateRequestHelper;
