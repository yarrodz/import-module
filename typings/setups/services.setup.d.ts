import { Server as IO } from 'socket.io';
import DatasetsRepository from '../modules/datasets/datasets.repository';
import ImportProcessesRepository from '../modules/import-processes/import-processes.repository';
import ImportProcessesService from '../modules/import-processes/import-processes.service';
import ImportsRepository from '../modules/imports/imports.repository';
import ImportsService from '../modules/imports/imports.service';
import OAuthService from '../modules/oauth2/oauth2.service';
import SqlTransferHelper from '../modules/sql/sql-transfer.helper';
import ApiTransferHelper from '../modules/api/api-transfer.helper';
export default function setupServices(io: IO, datasetsRepository: DatasetsRepository, importsRepository: ImportsRepository, importProcessesRepository: ImportProcessesRepository, maxAttempts: number, attemptDelayTime: number, oAuth2RedirectUri: string, clientUri: string): {
    importsService: ImportsService;
    importProcessesService: ImportProcessesService;
    oAuth2Service: OAuthService;
    sqlTransferHelper: SqlTransferHelper;
    apiTransferHelper: ApiTransferHelper;
};
