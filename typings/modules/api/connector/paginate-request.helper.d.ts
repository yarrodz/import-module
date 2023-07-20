import { AxiosRequestConfig } from 'axios';
import { IRequestPaginationOptions } from '../sub-schemas/api-sub-schemas/request-pagination-options.schema';
import IOffsetPagination from '../../transfer/interfaces/offset-pagination.interface';
import ICursorPagination from '../../transfer/interfaces/cursor-pagination.interface';
import { TransferType } from '../../transfer/enums/transfer-type.enum';
declare class PaginateRequestHelper {
    paginate(request: AxiosRequestConfig, paginationType: TransferType, paginationOptions: IRequestPaginationOptions, pagination: IOffsetPagination | ICursorPagination): void;
    private paginateQueryParams;
    private paginateBody;
}
export default PaginateRequestHelper;
