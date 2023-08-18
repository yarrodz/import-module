import Request from './request.interface';
import { TransferMethod } from '../../transfers/enums/transfer-method.enum';
import RequestPaginationOptions from './request-pagination-options.interface';
import ImportField from '../../imports/interfaces/import-field.interface';
import RetryOptions from '../../imports/interfaces/retry-options.interace';
import { ProcessType } from '../../processes/process.type.enum';
import { Source } from '../../imports/enums/source.enum';
import ImportReference from '../../imports/interfaces/import-reference.interface';
export default interface ApiImport {
    id: number;
    name: string;
    idKey: string;
    type: ProcessType.IMPORT;
    source: Source.API;
    limitRequestsPerSecond: number;
    retryOptions: RetryOptions;
    request: Request;
    transferMethod: TransferMethod;
    paginationOptions?: RequestPaginationOptions;
    datasetsPath: string;
    idPath: string;
    fields?: ImportField[];
    __: ImportReference;
}
