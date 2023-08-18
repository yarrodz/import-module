import { Server as IO } from 'socket.io';
import { iFrameDbClient } from 'iframe-ai';
import { InitRoutersResult } from './init/routers.init';
import PendingTransfersReloader from './modules/transfers/helpers/pending-transfers.reloader';
export interface InitParams {
    io: IO;
    dbClient: iFrameDbClient;
    clientUri: string;
    oAuth2RedirectUri: string;
}
export interface InitResult extends InitRoutersResult {
    pendingTransfersReloader: PendingTransfersReloader;
}
