import { Request } from 'express';
import ProcessesRepository from '../processes/process.repository';
import TransfersRepository from '../transfers/transfers.repository';
import ApiConnectionHelper from './helpers/api-connection.helper';
import ApiColumnsHelper from './helpers/api-columns.helper';
import ApiImportHelper from './helpers/api-import.helper';
import OAuth2AuthUriHelper from '../oauth2/helpers/oauth2-auth-uri.helper';
import ResponseHandler from '../../utils/response-handler/response-handler';
import ApiImport from './interfaces/api-import.interface';
declare class ApiImportService {
    private apiConnectionHelper;
    private apiColumnsHelper;
    private apiImportHelper;
    private oAuth2AuthUriHelper;
    private processesRepository;
    private transfersRepository;
    constructor(apiConnectionHelper: ApiConnectionHelper, apiColumnsHelper: ApiColumnsHelper, apiImportHelper: ApiImportHelper, oAuth2AuthUriHelper: OAuth2AuthUriHelper, processesRepository: ProcessesRepository, transfersRepository: TransfersRepository);
    getColumns(req: Request, impt: ApiImport): Promise<ResponseHandler>;
    checkIdColumnUniqueness(req: Request, impt: ApiImport): Promise<ResponseHandler>;
    import(req: Request, impt: ApiImport): Promise<ResponseHandler>;
}
export default ApiImportService;
