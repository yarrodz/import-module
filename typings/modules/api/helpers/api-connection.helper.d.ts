import ProcessesRepository from '../../processes/process.repository';
import OAuth2RefreshTokenHelper from '../../oauth2/helpers/oath2-refresh-token.helper';
import ApiImport from '../interfaces/api-import.interface';
import { ConnectionState } from '../enums/connection-state.enum';
declare class ApiConnectionHelper {
    private oAuth2RefreshTokenHelper;
    private processesRepository;
    constructor(oAuth2RefreshTokenHelper: OAuth2RefreshTokenHelper, processesRepository: ProcessesRepository);
    connect(impt: ApiImport): Promise<ConnectionState>;
    private sendRequest;
}
export default ApiConnectionHelper;
