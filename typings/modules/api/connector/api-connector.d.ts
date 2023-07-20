import { IApi } from '../api.schema';
import IOffsetPagination from '../../transfer/interfaces/offset-pagination.interface';
import ICursorPagination from '../../transfer/interfaces/cursor-pagination.interface';
declare class ApiConnector {
    private authRequestHelper;
    private paginateRequestHelper;
    private parseResponseHelper;
    private request;
    private auth?;
    private paginationType?;
    private paginationOptions?;
    private responseType;
    constructor(api: IApi);
    sendRequest(): Promise<object[]>;
    authorizeRequest(): Promise<void>;
    paginateRequest(pagination: IOffsetPagination | ICursorPagination): void;
    private parseResponse;
}
export default ApiConnector;
