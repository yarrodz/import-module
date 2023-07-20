import { Server as IO } from 'socket.io';
import { Model } from 'mongoose';
import { IRecord } from './modules/records/record.interface';
import { IDataset } from './modules/datasets/dataset.interface';
import ImportsRouter from './modules/imports/imports.router';
import ImportProcessesRouter from './modules/import-processes/import-processes.router';
import OAuth2Router from './modules/oauth2/oauth2.router';
export interface ISetupParams {
    io: IO;
    recordModel: Model<IRecord>;
    datasetModel: Model<IDataset>;
    maxAttempts: number;
    attemptDelayTime: number;
    oAuth2RedirectUri: string;
    clientUri: string;
}
export interface ISetupResult {
    importsRouter: ImportsRouter;
    importProcessesRouter: ImportProcessesRouter;
    oAuth2Router: OAuth2Router;
    reloadPendingImportProcesses: Function;
}
