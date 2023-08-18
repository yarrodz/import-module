import { Request } from 'express';
import ProcessesRepository from '../processes/process.repository';
import TransfersRepository from '../transfers/transfers.repository';
import ApiConnectionHelper from './helpers/api-connection.helper';
import ApiImportHelper from './helpers/api-import.helper';
import OAuth2AuthUriHelper from '../oauth2/helpers/oauth2-auth-uri.helper';
import ResponseHandler from '../../utils/response-handler/response-handler';
import ApiImport from './interfaces/api-import.interface';
import Transfer from '../transfers/interfaces/transfer.interface';
declare class ApiTransferService {
    private apiConnectionHelper;
    private apiImportHelper;
    private oAuth2AuthUriHelper;
    private processesRepository;
    private transfersRepository;
    constructor(apiConnectionHelper: ApiConnectionHelper, apiImportHelper: ApiImportHelper, oAuth2AuthUriHelper: OAuth2AuthUriHelper, processesRepository: ProcessesRepository, transfersRepository: TransfersRepository);
    reload(req: Request, impt: ApiImport, transfer: Transfer): Promise<ResponseHandler>;
    retry(req: Request, impt: ApiImport, transfer: Transfer): Promise<ResponseHandler>;
}
export default ApiTransferService;
