import ImportsRepository from '../imports/imports.repository';
import OAuth2RefreshTokenHelper from '../oauth2/oath2-refresh-token.helper';
import { IImportDocument } from '../imports/import.schema';
import { ConnectionState } from '../connection/connection-state.enum';
declare class ApiConnectionHelper {
    private importsRepository;
    private oAuth2RefreshTokenHelper;
    constructor(importsRepository: ImportsRepository, oAuth2RefreshTokenHelper: OAuth2RefreshTokenHelper);
    connect(impt: IImportDocument): Promise<ConnectionState>;
    private sendRequest;
}
export default ApiConnectionHelper;
