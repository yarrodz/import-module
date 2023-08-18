import { InitServicesResult } from './services.init';
import OAuth2Controller from '../modules/oauth2/oauth2.controller';
import TransfersController from '../modules/transfers/transfers.controller';
import ImportsController from '../modules/imports/imports.controller';
import ConnectionsController from '../modules/connections/connections.controller';
export interface InitControllersResult {
    connectionsController: ConnectionsController;
    importsController: ImportsController;
    transfersController: TransfersController;
    oAuth2Controller: OAuth2Controller;
}
export default function initControllers(params: InitServicesResult): InitControllersResult;
