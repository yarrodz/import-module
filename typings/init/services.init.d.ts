import { Server as IO } from 'socket.io';
import { InitRepositoriesResult } from './repositories.init';
import OAuth2Service from '../modules/oauth2/oauth2.service';
import TransfersService from '../modules/transfers/transfers.service';
import ImportsService from '../modules/imports/imports.service';
import ConnectionsService from '../modules/connections/connections.service';
import PendingTransfersReloader from '../modules/transfers/helpers/pending-transfers.reloader';
export interface InitServicesParams extends InitRepositoriesResult {
    io: IO;
    clientUri: string;
    oAuth2RedirectUri: string;
}
export interface InitServicesResult {
    connectionsService: ConnectionsService;
    importsService: ImportsService;
    transfersService: TransfersService;
    oAuth2Service: OAuth2Service;
    pendingTransfersReloader: PendingTransfersReloader;
}
export default function initServices(params: InitServicesParams): InitServicesResult;
