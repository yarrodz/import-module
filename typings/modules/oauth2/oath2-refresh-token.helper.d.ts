import { IImportDocument } from '../imports/import.schema';
import ImportsRepository from '../imports/imports.repository';
declare class OAuth2RefreshTokenHelper {
    private importsRepository;
    constructor(importsRepository: ImportsRepository);
    refresh: (impt: IImportDocument) => Promise<void>;
}
export default OAuth2RefreshTokenHelper;
