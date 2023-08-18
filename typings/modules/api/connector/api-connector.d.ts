import ApiImport from '../interfaces/api-import.interface';
import OffsetPagination from '../../transfers/interfaces/offset-pagination.interface';
import CursorPagination from '../../transfers/interfaces/cursor-pagination.interface';
declare class ApiConnector {
    private request;
    private auth?;
    private paginationType?;
    private paginationOptions?;
    constructor(impt: ApiImport);
    sendRequest(): Promise<any>;
    authRequest(): Promise<void>;
    paginateRequest(pagination: OffsetPagination | CursorPagination): void;
}
export default ApiConnector;
