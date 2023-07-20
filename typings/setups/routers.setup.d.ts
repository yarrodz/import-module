import ImportProcessesController from '../modules/import-processes/import-processes.controller';
import ImportProcessesRouter from '../modules/import-processes/import-processes.router';
import ImportsController from '../modules/imports/imports.controller';
import ImportsRouter from '../modules/imports/imports.router';
import OAuth2Controller from '../modules/oauth2/oauth2.controller';
import OAuth2Router from '../modules/oauth2/oauth2.router';
export default function setupRouters(importsController: ImportsController, importProcessesController: ImportProcessesController, oAuth2Controller: OAuth2Controller): {
    importsRouter: ImportsRouter;
    importProcessesRouter: ImportProcessesRouter;
    oAuth2Router: OAuth2Router;
};
