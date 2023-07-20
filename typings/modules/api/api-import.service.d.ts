import { Request } from 'express';
import ResponseHandler from '../../utils/response-handler/response-handler';
import ApiConnectionHelper from './api-connection.helper';
import ApiColumnsHelper from './api-columns.helper';
import ApiTransferHelper from './api-transfer.helper';
import OAuth2AuthUriHelper from '../oauth2/oauth2-auth-uri.helper';
import ImportProcessesRepository from '../import-processes/import-processes.repository';
import { IImportDocument } from '../imports/import.schema';
import { IImportProcessDocument } from '../import-processes/import-process.schema';
import ImportsRepository from '../imports/imports.repository';
declare class ApiImportService {
    private apiConnectionHelper;
    private apiColumnsHelper;
    private apiTransferHelper;
    private oAuth2AuthUriHelper;
    private importProcessesRepository;
    private importsRepository;
    constructor(apiConnectionHelper: ApiConnectionHelper, apiColumnsHelper: ApiColumnsHelper, apiTransferHelper: ApiTransferHelper, oAuth2AuthUriHelper: OAuth2AuthUriHelper, importProcessesRepository: ImportProcessesRepository, importsRepository: ImportsRepository);
    connect(req: Request, impt: IImportDocument): Promise<ResponseHandler>;
    start(req: Request, impt: IImportDocument): Promise<ResponseHandler>;
    reload(req: Request, impt: IImportDocument, process: IImportProcessDocument): Promise<ResponseHandler>;
    retry(req: Request, impt: IImportDocument, process: IImportProcessDocument): Promise<ResponseHandler>;
}
export default ApiImportService;
